import Joi from "joi";

const paymentSchema = Joi.object({
    password: Joi.string().regex(/[0-9]{4}/).required(),
    amount: Joi.number().min(1).required(),
});

export default paymentSchema;