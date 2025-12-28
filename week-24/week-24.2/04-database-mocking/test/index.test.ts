import { describe, expect, test, it, vi } from 'vitest';
import request from "supertest";
import { app } from "../src/index";
import { prismaClient } from '../src/__mocks__/db';

// vi.mock('../src/db.ts', () => ({
//     prismaClient: { sum: { create: vi.fn() } }
// }))

vi.mock('../src/db.ts');

describe("POST /sum", () => {
    it("should return the sum of two numbers", async () => {

        prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a: 4,
            b: 5,
            result: 9
        });

        vi.spyOn(prismaClient.sum, 'create');

        const res = await request(app).post("/sum").send({
            a: 4,
            b: 5
        });

        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data: {
                a: 4,
                b: 5,
                result: 9
            }
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(9);
        expect(res.body.id).toBe(1);
    });

    it("should return 411 if no inputs are provided", async () => {
        const res = await request(app).post("/sum").send({});
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs");
    });
});

describe("GET /sum", () => {
    it("should return the sum of two numbers", async () => {

        prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a: 4,
            b: 6,
            result: 10
        });

        vi.spyOn(prismaClient.sum, 'create');

        const res = await request(app)
            .get("/sum")
            .set({
                a: "4",
                b: "6"
            })
            .send();

        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data: {
                a: 4,
                b: 6,
                result: 10
            }
        })
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(10);
        expect(res.body.id).toBe(1);
    });

    it("should return 411 if no inputs are provided", async () => {
        const res = await request(app)
            .get("/sum").send();
        expect(res.statusCode).toBe(411);
    });
});