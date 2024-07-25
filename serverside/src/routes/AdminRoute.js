import express from "express"
import AdminController from "../controller/AdminController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get("/",jwtCheck,jwtParse,AdminController.getAllUser);
router.post("/",jwtCheck,jwtParse,AdminController.createFairPriceItem)
router.post("/cuurentPrice",jwtCheck,jwtParse,AdminController.updateCurentPrice)


export default router;