import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function postCard(req: Request, res: Response) {
    const {employeeId , type} = req.body
    const {apiKey} = res.locals

    await cardService.createCard(employeeId, type, apiKey)
    res.sendStatus(201);
}

export async function activeCard(req: Request, res: Response) {
    const {id} = req.params
    const idCard = Number(id)
    const {password , securityCode} = req.body

    await cardService.editCard(idCard, password, securityCode)
    res.sendStatus(201);
}

export async function getCardBalance(req:Request , res: Response) {
    const {id} = req.params
    const idCard = Number(id)
    res.send(await cardService.getBalance(idCard))
}