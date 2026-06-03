import type { IncomingMessage, ServerResponse } from "http";
import type { JwtPayload } from "jsonwebtoken";
import {RevokeTokenModel } from "../models/index.ts";

export interface AuthenticatedRequest extends IncomingMessage {
    user?: JwtPayload | string
}

export const authenticateToken = async (
    req: AuthenticatedRequest, 
    res: ServerResponse
):Promise<boolean> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.statusCode = 401
        res.end(JSON.stringify({message:"Unauthorized"}))
        return false
    }

    if(await RevokeTokenModel.isTokenRevoked(token)) {}

    return true
}  