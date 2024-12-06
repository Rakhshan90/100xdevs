import express from 'express';
import {prismaClient} from './db';

export const app = express();

app.use(express.json());

app.post('/sum', async(req: any, res: any)=>{
    const a = req.body.a;
    const b = req.body.b;

    if(a > 100000 || b > 100000){
        return res.status(403).json({
            message: 'We do not support big numbers',
        })
    }

    const result = a + b;

    const respone = await prismaClient.request.create({
        data: {
            a,
            b,
            answer: result,
            type: 'ADD',
        }
    })

    return res.json({
        id: respone.id,
        answer: result,
    })
})