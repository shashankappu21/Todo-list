const zod = require('zod');

const userRight = zod.object({
    username: zod.string(),
    password: zod.string(),
    fullName: zod.string(),
    email: zod.string().email()
});

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
});

const updateTodo = zod.object({
    id: zod.string()
});

module.exports = {
    userRight: userRight,
    createTodo: createTodo,
    updateTodo: updateTodo
}
