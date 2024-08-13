import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// insert data into user table
async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  const res = await prisma.user.create({
    data: {
        username,
        password, 
        firstName, 
        lastName,
    },
    select: {
        id: true,
        password: true,
    }
  })

  console.log(res);
}

// insertUser("elon@gmail.com", "123456", "elon", "mask");


// update user data of user table

interface updateParams{
    firstName: string,
    lastName: string,
}

async function updateUser(username: string, {
    firstName, lastName
}: updateParams){
    const res = await prisma.user.update({
        where: {username},
        data: {
            firstName,
            lastName,
        },
        select: {
            firstName: true,
            lastName: true,
            username: true,
        }
    })

    console.log(res);
}

// updateUser("elon@gmail.com", {
//     firstName: "ronaldo",
//     lastName: "davinci"
// });

async function getUser(username: string){
    const res = await prisma.user.findUnique({
        where: {username},
    })

    console.log(res);
}

getUser("rakhshan@gmail.com");