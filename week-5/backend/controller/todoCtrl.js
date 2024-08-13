const expressAsyncHandler = require('express-async-handler');
const { createTodo, updateTodo } = require("../types");
const Todo = require('../model/Todo');


const createTodoCtrl = expressAsyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const response = createTodo.safeParse({ title, description });
    if (!response.success) throw new Error("Invalid input type of title and description");
    try {
        const newTodo = await Todo.create({ title, description });
        res.status(200).json(newTodo);
    } catch (error) {
        res.json(error);
    }
});

const updateTodoCtrl = expressAsyncHandler(async (req, res) => {
    const todoId = req.params.todoId;
    try {
        await Todo.findByIdAndUpdate(todoId, {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        });
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        res.json(error);
    }
});

const getAllTodosCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const allTodos = await Todo.find({});
        res.status(200).json(allTodos);
    } catch (error) {
        res.json(error);
    }
});

const completeTodoCtrl = expressAsyncHandler(async (req, res) => {
    const { todoId } = req.body;
    // const respone = updateTodo.safeParse(todoId);
    // if(!respone.success) throw new Error("Type of todo Id is not valid");
    try {
        await Todo.findByIdAndUpdate(todoId, {
            completed: true,
        });
        res.status(200).json({message: "Marked todo as done"});
    } catch (error) {
        res.json(error);
    }
});


module.exports = { createTodoCtrl, updateTodoCtrl, getAllTodosCtrl, completeTodoCtrl };