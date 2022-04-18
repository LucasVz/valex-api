import { Router } from "express";
import cardSchema from "../../schemas/cardSchema.js";
import ativateSchema from "../../schemas/ativateSchema.js"
import amountSchema from "../../schemas/amountSchema.js"
import paymentSchema from "../../schemas/paymentSchema.js"
import * as cardController  from "../controllers/cardController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import {verifyKeyApi} from "../middlewares/validateAuthMiddlewere.js"

const cardRouter = Router();

cardRouter.post("/card",validateSchemaMiddleware(cardSchema),verifyKeyApi, cardController.postCard);
cardRouter.put("/card/:id/active",validateSchemaMiddleware(ativateSchema),cardController.activeCard)
cardRouter.get("/card/:id", cardController.getCardBalance)
cardRouter.post("/card/:id/recharge", validateSchemaMiddleware(amountSchema),verifyKeyApi,cardController.postCardRecharge)
cardRouter.post("/card/:id/payment/:idBusiness",validateSchemaMiddleware(paymentSchema), cardController.postCardPayment)
export default cardRouter;