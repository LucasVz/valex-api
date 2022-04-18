import Joi from "joi";

const ativateSchema = Joi.object({
    password: Joi.string().regex(/[0-9]{4}/).required(),
    securityCode: Joi.string().required()
});
  
  export default ativateSchema;