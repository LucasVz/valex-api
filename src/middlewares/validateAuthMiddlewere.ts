import { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService.js"

export async function verifyKeyApi(req: Request, res : Response, next : NextFunction) {
    console.log(req.headers['x-api-key'])
    const apiKey : any = req.headers['x-api-key']
    if(!apiKey) throw {error_type : "auth_error", message: "apikey not found"}
    const validCompany = await authService.validateCompany(apiKey)
    res.locals.apikey = validCompany.apiKey
    next()
}