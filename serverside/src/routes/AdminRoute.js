import express from "express"
import AdminController from "../controller/AdminController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get("/",jwtCheck,jwtParse,AdminController.getAllUser);
router.post("/",jwtCheck,jwtParse,AdminController.createFairPriceItem)
router.post("/curRentPrice",jwtCheck,jwtParse,AdminController.updateCurentPrice);
router.get("/curRentPrice",jwtCheck,jwtParse,AdminController.getCurrentPrice);



export default router;