import * as authCompanyRepository from "../repositories/companyRepository.js"

export async function verifyApiKey(apikey: string){
    const verifyKey: any = await authCompanyRepository.findByApiKey(apikey)
    if(!verifyKey) throw {error_type : "unauthorized company", message: "the company does not is authorized"}
    return verifyKey; 
}