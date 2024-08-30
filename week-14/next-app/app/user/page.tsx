import React from 'react'
import prisma from '@/db';




const getUser = async () => {
    try {
        const user = await prisma.user.findFirst();
        return {
            email: user?.email,
        }
    } catch (error) {
        console.log(error);
    }
}

const user = async () => {
    const data = await getUser();
    return (
        <div className='flex gap-4'>
            <div>{data?.email}</div>
        </div>
    )
}

export default user