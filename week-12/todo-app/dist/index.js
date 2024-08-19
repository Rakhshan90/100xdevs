"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({ message: "hello world" });
});
app.use('/api/user', userRouter_1.default);
app.use('/api/todo', todoRouter_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
