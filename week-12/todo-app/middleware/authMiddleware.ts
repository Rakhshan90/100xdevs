import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


interface JwtPayload {
    userId: string;
}

const authMiddleware = async (req: any, res: Response, next: NextFunction)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){

        token = req?.headers?.authorization.split(" ")[1];
 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
            req.user = { userId: decode.userId }; // Assign as an object
            next();
        } catch (error) {
            return res.status(401).json({message: "Unauthorized access, token is invalid or expired."});
        }    
    }
    else{
        res.status(401).json({message: "Token is not found."});
    }
}

export default authMiddleware;