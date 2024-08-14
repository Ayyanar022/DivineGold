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

//new jewllDesign
router.post('/AddnewItemDesign',jwtCheck,jwtParse,AdminController.AddnewItemDesign)
router.get('/get-AllItemDesign',jwtCheck,jwtParse,AdminController.getAllJewllDesigns)
router.put('/edit-jewllDesign',jwtCheck,jwtParse,AdminController.editJewllDesign);
router.delete('/delete-jewllDesign',jwtCheck,jwtParse,AdminController.deleteJewllDesign);

//constant Data Add
router.post('/ItemName',jwtCheck,jwtParse,AdminController.AddItemName);
router.post('/ItemCategory',jwtCheck,jwtParse,AdminController.AddItemCategory);
router.post('/Itemtype',jwtCheck,jwtParse,AdminController.AddItemType);
router.post('/itemGender',jwtCheck,jwtParse,AdminController.AddItemGender);



export default router;