import express from "express";
import {z} from 'zod';

// interface User{
//     readonly name: string;
//     readonly age: number;
//     // email: string;
//     // password: string;
// }

// type updateProp = Pick<User, 'name' | 'age' | 'password' >
// type updatePropOptional = Partial<updateProp>

// function updateUser(user: updatePropOptional){
//     console.log(`Name: ${user.name}, Age: ${user.age}`);
// }

// updateUser({
//     name: 'Rakhshan',
//     age: 23,
// })

// interface User{
//     name: string;
//     age: number;
// }

// const user: Readonly<User> = {
//     name: 'Rakhshan',
//     age: 23
// }

// user.name = 'Ahmad'

// interface User {
//     name: string;
//     age: number;
// }

// type Users = Record<string, User>

// const users: Users = {
//     "key1" : {name: "Rakhshan", age: 23},
//     "key2" : {name: "Hassan", age: 19}
// }

// interface User{
//     name: string;
//     age: number;
// }

// const users = new Map<string, User>();

// users.set('key1', {name: 'Rakhshan', age: 23});
// users.set('key2', {name: 'Hassan', age: 19});

// const user1 = users.get('key1')

// type eventType = 'click' | 'scroll' | 'mouseover';
// type excludeEventType = Exclude<eventType, 'scroll'>;

// const clickHandler = (event: excludeEventType)=>{
//     console.log(`event is listening on ${event}`);
// }

// clickHandler('click');
// clickHandler('mouseover');
// clickHandler('scroll');


const app = express();

// runtime object
const userProfileSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
  });

  // compile-time object
  export type finalSchema = z.infer<typeof userProfileSchema>;

  app.post('/update/user-profile', (req, res)=>{
    const {success} = userProfileSchema.safeParse(req.body);

    // compile time object
    const updateProfile : finalSchema = req.body;

    if(!success) return res.status(403).json({message: "Wrong inputs"});

    res.json({message: "Profile updated"});

  });


