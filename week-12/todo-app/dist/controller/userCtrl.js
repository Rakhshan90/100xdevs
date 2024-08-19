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
exports.userSignInCtrl = exports.userSignUpCtrl = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const signUpSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(2, {
        message: "first name should be atleast 2 characters"
    }),
    lastName: zod_1.default.string().optional(),
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8, {
        message: "password should be atleast 8 characters long"
    }),
});
const signInSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8, {
        message: "password should be atleast 8 characters long"
    }),
});
const userSignUpCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, username, password } = req === null || req === void 0 ? void 0 : req.body;
    const response = signUpSchema.safeParse({
        username,
        firstName,
        lastName,
        password
    });
    if (!response.success)
        return res.status(403).json({ message: "Invalid input type." });
    const existingUser = yield prisma.user.findUnique({
        where: {
            username
        }
    });
    if (existingUser)
        return res.status(403).json({ message: `User already exists with this username ${username}` });
    yield prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    });
    res.status(200).json({ message: `Your account is created successfully` });
});
exports.userSignUpCtrl = userSignUpCtrl;
const userSignInCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req === null || req === void 0 ? void 0 : req.body;
    const { success } = signInSchema.safeParse({
        username,
        password
    });
    if (!success)
        return res.status(403).json({ message: "Invalid input type" });
    const findUser = yield prisma.user.findUnique({
        where: {
            username,
            password,
        }
    });
    if (!findUser)
        return res.status(403).json({ message: `Incorrect username and password` });
    const userId = findUser.id;
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET_KEY);
    res.status(200).json(token);
});
exports.userSignInCtrl = userSignInCtrl;
