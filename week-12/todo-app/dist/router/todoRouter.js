"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoCtrl_1 = require("../controller/todoCtrl");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const todoRouter = express_1.default.Router();
todoRouter.post('/create', authMiddleware_1.default, todoCtrl_1.createTodoCtrl);
todoRouter.get('/', authMiddleware_1.default, todoCtrl_1.getTodosByUserCtrl);
todoRouter.put('/complete', authMiddleware_1.default, todoCtrl_1.completeTodoCtrl);
todoRouter.delete('/', authMiddleware_1.default, todoCtrl_1.deleteTodoCtrl);
exports.default = todoRouter;
