const express = require('express')
const cors = require('cors')
const Todo = require('./models/todo')

const app = express();
app.use(express.json());
app.use(cors())

//  FETCHING TODOS LIST 
app.get('/api/fetch-todos', async (req, res) => {
    try {
        const todosData = await Todo.find();

        return res.status(200).json({
            message: "Todos fetched successfully",
            todos: todosData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching todos",
            error: error.message
        })
    }
})

//  CREATING TODO 
app.post("/api/create-todo", async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
        })
        return res.status(201).json({
            message: "Todo created successfully",
            todo: todo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error creating todo",
            error: error.message
        })
    }
})

//  DELETING TODO 
app.delete('/api/delete-todo/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Todo deleted successfully",
            todo: deletedTodo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting todo",
            error: error.message
        })
    }
})

//  TOGGLE COMPLETE TODO 
app.patch('/api/toogle-complete/:id', async(req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id);
        await Todo.findByIdAndUpdate(req.params.id,{completed: !todo.completed}, {new:true} )
        return res.status(200).json({
            message: "Todo completed successfully",
            todo: todo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error completing todo",
            error: error.message
        })
    }
})

// app.use("/api/auth", authRoutes)



module.exports = app;