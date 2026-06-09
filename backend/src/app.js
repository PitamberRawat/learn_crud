import express from 'express'
import cors from 'cors'
import Todo from './models/todo.js'
import authRoutes from './routes/authRoute.js'
import todoRoutes from './routes/todoRoute.js'
import dotenv from 'dotenv'
import user from './models/user.js'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes)

export default app;