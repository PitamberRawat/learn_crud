import express from "express";
import { createTodo, deleteTodo, getTodos, toogleTodo } from "../controllers/todoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();


router.get('/fetch-todos', authMiddleware, getTodos)
router.post('/create-todo', authMiddleware, createTodo)
router.delete('/delete-todo/:id', authMiddleware, deleteTodo)
router.patch('/toogle-complete/:id', authMiddleware, toogleTodo)

export default router;