import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

// console.log(Object.keys(PrismaClient));
export const prismaClient = mockDeep<PrismaClient>()