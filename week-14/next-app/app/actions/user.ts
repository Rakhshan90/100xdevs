'use server';

import prisma from "@/db";


export async function singup(email: string, password: string){

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password
            }
        });

        return true;
    } catch (error) {
        return false;
    }
}