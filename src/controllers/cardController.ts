import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function postCard(req: Request, res: Response) {
    const {apiKey} = res.locals
    const {employeeId , type} = req.body
    console.log(apiKey)

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
    const idCard = parseInt(id)
    res.send(await cardService.getBalance(idCard))
}

export async function postCardRecharge(req:Request , res: Response) {
    const {id} = req.params
    const idCard = Number(id)
    const amount = req.body.amount
    await cardService.CardRecharge(idCard,amount)
    res.sendStatus(201)
}

export async function postCardPayment(req:Request , res: Response) {
    const {id, idBusiness} = req.params
    const idCard = Number(id)
    const numberIdBusiness = Number(idBusiness)
    const amount = req.body.amount
    const password = req.body.password
    await cardService.cardPayment(idCard, password, numberIdBusiness, amount)
    res.sendStatus(201)
}

