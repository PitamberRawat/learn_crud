import axios from "axios";
import { useEffect, useState } from "react";

const Todo = () => {
    const API_URL = "http://localhost:3100/api/todos"

    const [todoList, setTodoList] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTodoList();
    }, [])

    const fetchTodoList = async () => {
        try {
            const res = await axios.get(`${API_URL}/fetch-todos`);
            setTodoList(res.data.todos);
        } catch (err) {
            console.log(err);
        }
    }

    const createTodo = async () => {
        if (!title.trim()) return;

        try {
            const res = await axios.post(`${API_URL}/create-todo`, { title, description });

            setTodoList((prev) => [...prev, res.data.todo])
            setTitle('');
            setDescription('');
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/delete-todo/${id}`);
            setTodoList((prev) => prev.filter((todo) => todo._id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    const toggleComplete = async (id) => {
        try{
            console.log("executing");
            await axios.patch(`${API_URL}/toogle-complete/${id}`);
            setTodoList((prev)=>prev.map((todo)=>todo._id === id ? {...todo, completed : !todo.completed}: todo))
        }catch(err){
            console.log(err);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') createTodo();
    }

    return (
        <div className='todo-container'>
            <header className='todo-header'>
                <h1>Todo App</h1>
            </header>

            <section className='todo-form-section'>
                <h2 className='section-title'>Create a new todo</h2>
                <div className='todo-form'>
                    <input
                        type="text"
                        placeholder="Enter title"
                        className='input-field'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <input
                        type="text"
                        placeholder="Enter description"
                        className='input-field'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className='button create-button' onClick={createTodo}>
                        Add Todo
                    </button>
                </div>
            </section>

            <section className='todo-list-section'>
                <h2 className='section-title'>My todos ({todoList.length})</h2>
                {todoList.length > 0 ? (
                    <div className='todo-list'>
                        {todoList.map((todo) => (
                            <div className='todo-item' key={todo._id}>
                                <div className='todo-item-header'>
                                    <h3 className='todo-item-title'>{todo.title}</h3>
                                    <button
                                        className='button delete-button'
                                        onClick={() => deleteTodo(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className='todo-item-header'>
                                {todo.description && (
                                    <p className='todo-description'>{todo.description}</p>
                                )}
                                <button className={`button complete-button ${todo.completed ? 'completed-button' : 'incompleted-button'}`} onClick={()=>toggleComplete(todo._id)}>
                                    {todo.completed ? 'Completed' : 'Incompleted'}
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='empty-state'>No todos yet. Create one above!</p>
                )}
            </section>
        </div>
    )
}

export default Todo
