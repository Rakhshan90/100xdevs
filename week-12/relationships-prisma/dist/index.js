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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertUser = (username, password, firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    });
    console.log(res);
});
// insertUser("test", "12345", "test", "test");
const updateUser = (id, username, password, firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.update({
        data: {
            username,
            firstName,
            lastName,
            password,
        },
        where: {
            id
        },
    });
    console.log(res);
});
// updateUser(3, 'shaz007', 'pass1234', 'Shaz', 'Ahmad');
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    });
    console.log(res);
});
// getUser(1);
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.findMany({
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    });
    console.log(res);
});
// getAllUsers();
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.delete({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    });
    console.log(res);
});
// deleteUser(4);
const addTodo = (title, description, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todo.create({
        data: {
            title,
            description,
            userId,
        }
    });
    console.log(res);
});
// addTodo('Go to gym', 'Go gym tomorrow at 6 am', 2);
const getTodosAndUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            description: true,
            user: true
        }
    });
    console.log(res);
});
getTodosAndUserDetails(1);
