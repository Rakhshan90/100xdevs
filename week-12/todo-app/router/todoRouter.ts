import expres from 'express';
import { completeTodoCtrl, createTodoCtrl, deleteTodoCtrl, getTodosByUserCtrl } from '../controller/todoCtrl';
import authMiddleware from '../middleware/authMiddleware';

const todoRouter = expres.Router();

todoRouter.post('/create', authMiddleware, createTodoCtrl);
todoRouter.get('/', authMiddleware, getTodosByUserCtrl);
todoRouter.put('/complete', authMiddleware, completeTodoCtrl);
todoRouter.delete('/', authMiddleware, deleteTodoCtrl);

export default todoRouter;