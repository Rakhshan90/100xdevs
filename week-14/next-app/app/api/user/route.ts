import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export function GET(){
    return NextResponse.json({
        email: "test@gmail.com",
        name: "test"
    })
}

export async function POST(req: NextRequest){
    const body = await req.json();

    try {
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });

        return NextResponse.json(newUser);
    } catch (error) {
        return NextResponse.json({message: "Something went wrong while creating your account"});
    }
}