import * as authRepository from "../repositories/companyRepository.js"

export async function validateCompany(apiKey : string){
    const validCompany = await authRepository.findByApiKey(apiKey)
    if(!validCompany) throw {error_type : "unauthorized_company", message: "the company does not is authorized"}
    return validCompany
}