import z from 'zod';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const signUpSchema = z.object({
    firstName: z.string().min(2, {
        message: "first name should be atleast 2 characters"
    }),
    lastName: z.string().optional(),
    username: z.string().email(),
    password: z.string().min(8, {
        message: "password should be atleast 8 characters long"
    }),
})

const signInSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8, {
        message: "password should be atleast 8 characters long"
    }),
})

export const userSignUpCtrl = async (req: Request, res: Response)=>{

    const {firstName, lastName, username, password} = req?.body;
    const response = signUpSchema.safeParse({
        username,
        firstName,
        lastName,
        password
    })

    if(!response.success) return res.status(403).json({message: "Invalid input type."});

    const existingUser = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if(existingUser) return res.status(403).json({message: `User already exists with this username ${username}`});

    await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })

    res.status(200).json({message: `Your account is created successfully`});
}

export const userSignInCtrl = async (req: Request, res: Response)=>{
    const {username, password} = req?.body;

    const {success} = signInSchema.safeParse({
        username,
        password
    });
    if(!success) return res.status(403).json({message: "Invalid input type"});

    const findUser = await prisma.user.findUnique({
        where: {
            username,
            password,
        }
    });

    if(!findUser) return res.status(403).json({message: `Incorrect username and password`});

    const userId = findUser.id;

    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY as string);

    res.status(200).json(token);
}


