"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoCtrl = exports.completeTodoCtrl = exports.getTodosByUserCtrl = exports.createTodoCtrl = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const todoSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
});
const createTodoCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { title, description } = req === null || req === void 0 ? void 0 : req.body;
    const { success } = todoSchema.safeParse({
        title,
        description,
    });
    if (!success)
        return res.status(403).json({ message: "Invalid input type" });
    const newTodo = yield prisma.todo.create({
        data: {
            title,
            description,
            userId
        },
    });
    res.status(200).json(newTodo);
});
exports.createTodoCtrl = createTodoCtrl;
const getTodosByUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const todos = yield prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            description: true,
            done: true,
            user: true,
        }
    });
    res.status(200).json(todos);
});
exports.getTodosByUserCtrl = getTodosByUserCtrl;
const completeTodoCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.body;
    if (!todoId)
        return res.status(404).json({ message: "Todo not found, unable to mark as completed." });
    const updatedTodo = yield prisma.todo.update({
        data: {
            done: true,
        },
        where: {
            id: todoId,
        }
    });
    res.status(200).json(updatedTodo);
});
exports.completeTodoCtrl = completeTodoCtrl;
const deleteTodoCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.body;
    if (!todoId)
        return res.status(404).json({ message: "Todo not found, unable to delete todo." });
    yield prisma.todo.delete({
        where: {
            id: todoId,
        }
    });
    res.status(200).json({ message: `Todo ${todoId} has been removed` });
});
exports.deleteTodoCtrl = deleteTodoCtrl;
