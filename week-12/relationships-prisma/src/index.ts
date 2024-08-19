import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertUser = async (username: string, password: string, firstName: string, lastName: string)=>{

    const res = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        },
        select: {
            id: true,
            username : true,
            firstName : true,
            lastName : true,
        }
    })

    console.log(res);
}

// insertUser("test", "12345", "test", "test");

const updateUser = async(id: number, username: string, password: string, firstName: string, lastName: string) => {
    const res = await prisma.user.update({
        data: {
            username,
            firstName,
            lastName,
            password,
        },
        where: {
            id
        },
    })

    console.log(res);
}

// updateUser(3, 'shaz007', 'pass1234', 'Shaz', 'Ahmad');

const getUser = async (id: number)=>{
    const res = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    })

    console.log(res);
}

// getUser(1);


const getAllUsers = async ()=>{
    const res = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    })

    console.log(res);
}

// getAllUsers();

const deleteUser = async (id: number)=>{
    const res = await prisma.user.delete({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    })

    console.log(res);
}

// deleteUser(4);

const addTodo = async (title: string, description: string, userId: number)=>{
    const res = await prisma.todo.create({
        data: {
            title,
            description,
            userId,
        }
    })

    console.log(res);
}

// addTodo('Go to gym', 'Go gym tomorrow at 6 am', 2);

const getTodosAndUserDetails = async (userId: number)=>{
    const res = await prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            description: true,
            user: true
        }
    })

    console.log(res);
}

getTodosAndUserDetails(1);