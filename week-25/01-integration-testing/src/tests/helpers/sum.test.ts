import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../../index";
import request from "supertest";
import { clearDB } from "./reset-db";

describe("POST /sum", () => {
    beforeAll(async()=> {
        console.log('db cleared');
        await clearDB();
    })
    it("should sum add 2 numbers", async () => {
        const { status, body } = await request(app).post('/sum').send({
            a: 1,
            b: 2
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 3, id: expect.any(Number) });
    });
    it("should sum by adding one positive and other negative number", async () => {
        const { status, body } = await request(app).post('/sum').send({
            a: -5,
            b: 7
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 2, id: expect.any(Number) });
    });
    it("should avoid computing for very big number", async () => {
        const { status, body } = await request(app).post('/sum').send({
            a: 1000000,
            b: 7
        })
        expect(status).toBe(403);
        expect(body).toEqual({ message: 'We do not support big numbers' });
    });
})