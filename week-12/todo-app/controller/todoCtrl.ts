import z from 'zod';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
})

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            userId: number;
            // Add any other fields that might be in `req.user`
        };
    }
}



export const createTodoCtrl = async (req: Request, res: Response)=>{

    const {userId} = req.user!;
    const {title, description} = req?.body;
    const {success} = todoSchema.safeParse({
        title,
        description,
    });

    if(!success) return res.status(403).json({message: "Invalid input type"});

    const newTodo = await prisma.todo.create({
        data: {
            title,
            description,
            userId
        },
    });

    res.status(200).json(newTodo);
}

export const getTodosByUserCtrl = async (req: Request, res: Response)=>{
    const {userId} = req.user!;
    const todos = await prisma.todo.findMany({
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
    })

    res.status(200).json(todos);
}

export const completeTodoCtrl = async (req: Request, res: Response)=>{
    const {todoId} = req.body;
    if(!todoId) return res.status(404).json({message: "Todo not found, unable to mark as completed."});
    const updatedTodo = await prisma.todo.update({
        data: {
            done: true,
        },
        where: {
            id: todoId,
        }
    });
    res.status(200).json(updatedTodo);
}

export const deleteTodoCtrl = async(req: Request, res: Response)=>{
    const {todoId} = req.body;
    if(!todoId) return res.status(404).json({message: "Todo not found, unable to delete todo."});

    await prisma.todo.delete({
        where: {
            id: todoId,
        }
    });

    res.status(200).json({message: `Todo ${todoId} has been removed`});
}

