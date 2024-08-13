const zod = require('zod');

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string(),
});

const updateTodo = zod.object({
    todoId: zod.string()
});

module.exports = {createTodo, updateTodo}