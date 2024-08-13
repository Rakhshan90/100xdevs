const express = require('express');
const {createTodoCtrl, updateTodoCtrl, getAllTodosCtrl, completeTodoCtrl} = require('../controller/todoCtrl');

const todoRouter = express.Router();

todoRouter.post('/create', createTodoCtrl);
todoRouter.put('/update/:todoId', updateTodoCtrl);
todoRouter.put('/complete', completeTodoCtrl);
todoRouter.get('/todos', getAllTodosCtrl);

module.exports = todoRouter;