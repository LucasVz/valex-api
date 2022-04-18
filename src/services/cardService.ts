import { faker } from '@faker-js/faker';
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from '../repositories/cardRepository.js'
import * as paymentRepository from '../repositories/paymentRepository.js'
import * as rechargeRepository from '../repositories/rechargeRepository.js'
import dayjs from "dayjs"
import bcrypt from "bcrypt"


export async function createCard(employeeId: number , type: cardRepository.TransactionTypes, apiKey: number) {
    const employees = await employeeRepository.findById(employeeId)
    if(!employees) throw { type: "employees_not_found_error", message: "employee does not exist" };
    const number: string = createCardNumber()
    const cardholderName: string = formatName(employees.fullName)
    const securityCode: string = createCVV()
    const expirationDate: string = createExpDate()
    const cardsType = await cardRepository.findByTypeAndEmployeeId(type , employeeId)
    if(cardsType) throw { type: "creat_card_error", message: "card already exists" }

    return await cardRepository.insert({
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual: false,
        originalCardId: null, 
        isBlocked: true,
        type,
    })
}

export async function editCard(id: number,password: string, securityCode:string) {
    const card = await getCardById(id)
    console.log(securityCode)
    console.log(card.securityCode)
    cardExpiringDate(card.expirationDate)
    if(!bcrypt.compareSync(securityCode, card.securityCode)) throw { type: "cvv_error", message: "cvv incorrect" }
    if (card.password) throw { type: "auth_error", message: "card already activated" }
    const bcryptPassword = bcrypt.hashSync(password, 10)
    return await cardRepository.update(id, {
        ...card,
        password: bcryptPassword
    })
}

export async function getBalance(id: number) {
    const paymensts = getPayments(id)
    const recharges = getRecharges(id)
    return({
        paymensts,
        recharges
    });
}

export async function getPayments(id: number) {
    const payments = await paymentRepository.findByCardId(id)
    return payments
}

export async function getRecharges(id: number) {
    const recharges = await rechargeRepository.findByCardId(id)
    return recharges
}

export function cardExpiringDate(expirationDate: string){
    const currentYear =  Number(dayjs().format("YY"))
    const currentonth =  Number(dayjs().format("MM"))
    const splitDate = expirationDate.split("/")
    if((currentYear > Number(splitDate[1])) ||  (currentYear === Number(splitDate[1]) && currentonth > Number(splitDate[1]))){
        throw { type: "expiring_date_error", message: "expired card expiration date" }
    }
}

export async function getCardById(id: number){
    const card = await cardRepository.findById(id)
    if(!card) throw { type: "not_found_error", message: "card not found" };
    return card
}

export function createExpDate(){
    const year =  Number(dayjs().format("YY"))
    const date = dayjs().format(`MM/${year + 5}`)
    console.log(date)
    return date
}

export function createCVV(){
    const cvv = faker.finance.creditCardCVV()
    console.log(cvv)
    return bcrypt.hashSync(cvv, 10);
}

export function createCardNumber(){
    console.log(faker.finance.creditCardNumber('mastercard'))
    return faker.finance.creditCardNumber('mastercard')
}

export function formatName(fullName : string){
    const separateName = fullName.split(" ");
    const shortName = [];
    for( let i = 0; i < separateName.length; i++){
        if(separateName[i][0] === separateName[i][0].toLowerCase())continue
        if(i !== 0  && i !== separateName.length -1){
            shortName.push(separateName[i][0])
        }else shortName.push(separateName[i])
    }
    return shortName.toString().replace(/,/g , " ").toUpperCase()
}