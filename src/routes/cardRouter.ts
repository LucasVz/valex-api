import { Router } from "express";
import * as cardController  from "../controllers/cardController.js"

const cardRouter = Router();

cardRouter.post("/card", cardController.postCard);
cardRouter.put("/card/:id/active",cardController.activeCard)
cardRouter.get("/card/:id", cardController.getCardBalance)
export default cardRouter;