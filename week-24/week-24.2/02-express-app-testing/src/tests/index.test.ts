import {describe, it, expect} from '@jest/globals';
import request from 'supertest';
import { app } from '../index';


describe('POST/sum', ()=>{
    it('3 + 2 equals to 5 with status code 200', async()=>{
        const res = await request(app).post('/sum').send({
            a: 3,
            b: 2,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(5);
    })
    it('wrong input with status code 411', async()=>{
        const res = await request(app).post('/sum').send({
            a: '12',
        });

        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs");
    })
})

describe('GET/sum', ()=>{
    it('3 + 2 equals to 5 with status code 200', async()=>{
        const res = await request(app).get('/sum').set({
            a: '3',
            b: '2'
        }).send();

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(5);
    })

    it('should return 411 if no inputs provided', async()=>{
        const res = await request(app).get('/sum').send();

        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs");
    })
})