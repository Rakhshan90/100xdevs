import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

await prisma.user.findMany({ 
    where: {
      email: { 
        contains: "alice@prisma.io",
      },
    },
    cacheStrategy: { ttl: 60 },
  });