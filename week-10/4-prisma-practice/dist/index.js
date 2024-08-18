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
// insert data into user table
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName,
            },
            select: {
                id: true,
                password: true,
            }
        });
        console.log(res);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            where: { username },
            data: {
                firstName,
                lastName,
            },
            select: {
                firstName: true,
                lastName: true,
                username: true,
            }
        });
        console.log(res);
    });
}
// updateUser("elon@gmail.com", {
//     firstName: "ronaldo",
//     lastName: "davinci"
// });
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findUnique({
            where: { username },
        });
        console.log(res);
    });
}
// getUser("rakhshan@gmail.com");
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany({
            select: {
                username: true,
                firstName: true,
                lastName: true,
            }
        });
        console.log(res);
    });
}
getUsers();
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.delete({
            where: { username },
        });
        console.log(res);
    });
}
// deleteUser("test@gmail.com");
