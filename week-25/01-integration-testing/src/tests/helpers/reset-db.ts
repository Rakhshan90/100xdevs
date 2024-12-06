
import { prismaClient } from '../../db';

export const clearDB = async () => {
    await prismaClient.$transaction([
        prismaClient.request.deleteMany(),
    ])
}