import express from "express"
import AdminController from "../controller/AdminController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get("/",jwtCheck,jwtParse,AdminController.getAllUser);
router.post("/",jwtCheck,jwtParse,AdminController.createFairPriceItem)
router.post("/currentPrice",jwtCheck,jwtParse,AdminController.updateCurentPrice);
router.get("/currentPrice",jwtCheck,jwtParse,AdminController.getCurrentPrice);
router.put('/',jwtCheck,jwtParse,AdminController.updateFairPriceItem)
router.delete('/',jwtCheck,jwtParse,AdminController.deletFairPriceItem)



export default router;