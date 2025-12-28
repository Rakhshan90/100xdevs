import client from "prom-client";
import { NextFunction, Request, Response } from "express";
import { requestCounter } from "./requestCount";

export const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Number of active requests',
    labelNames: ['method', 'route', 'status_code']
});

export const cleanupMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    activeRequestsGauge.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
    });

    res.on('finish', function() {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);
        
        setTimeout(()=> {
            activeRequestsGauge.dec({
                method: req.method,
                route: req.route ? req.route.path : req.path,
            });
        }, 5000);
    });

    next();
}
