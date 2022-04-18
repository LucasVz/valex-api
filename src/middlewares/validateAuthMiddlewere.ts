import { verifyApiKey } from "../services/authService";
import { NextFunction, Request, Response } from "express";

export async function verifyApiKeyMiddlewere(req : Request , res: Response, next: NextFunction) {
    const apiKey:any = req.headers['x-api-key'];
    if(!apiKey) throw {error_type : "auth_error", message: "apikey not found"};
    await verifyApiKey(apiKey);
    res.locals.apikey = apiKey;
    next();
}