import express from 'express';
import client from "prom-client";
// import { NextFunction, Request, Response } from "express";
import { requestCountMiddleware } from './metrics/requestCount';
import { cleanupMiddleware } from './metrics/activeRequests';
import { metricsMiddleware } from './metrics/metricsMiddleware';

const app = express();

// const middleware = (req: Request, res: Response, next: NextFunction) => {
//     const startTime = Date.now();
//     next();
//     const endTime = Date.now();
//     console.log(`Request took ${endTime - startTime}ms`);
// }

// app.use(middleware);

app.use(requestCountMiddleware);
app.use(cleanupMiddleware);
app.use(metricsMiddleware);

app.get('/user', async(req, res)=> {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    res.json({
        name: 'Jhon Doe',
        age: '25',
    })
});

app.post('/user', (req, res)=> {
    const user = req.body;
    res.json({
        ...user,
        id: 1
    })
});

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000, ()=> {
    console.log('server is listening on PORT 3000');
});