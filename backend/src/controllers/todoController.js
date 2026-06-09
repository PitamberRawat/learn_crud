import todo from "../models/todo.js";
import Todo from "../models/todo.js";

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userDetails.id })
        return res.status(200).json({
            message: "Todos fetched successfully",
            todos: todos
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching todos",
            error: err.message
        })
    }
}

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            })
        }

        const todo = await Todo.create({
            title,
            description,
            completed: false,
            user: req.userDetails.id
        })
        return res.status(201).json({
            message: "Todo created successfully",
            todo: todo
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error creating todo",
            error: err.message
        })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Todo deleted successfully",
            todo: todo
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error deleting todo",
            error: err.message
        })
    }
}

const toogleTodo = async(req,res)=>{
    try{
        const todo = await Todo.findById({_id:req.params.id})
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {completed:!todo.completed}, {new:true})
        return res.status(200).json({
            message: "Todo toggled successfully",
            todo: updatedTodo
        })
    }catch(err){
        return res.status(500).json({
            message: "Error toggling todo",
            error: err.message
        })
    }}

export { getTodos, createTodo, deleteTodo ,toogleTodo}