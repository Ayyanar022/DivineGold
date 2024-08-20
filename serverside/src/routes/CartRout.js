import express from 'express';
import { jwtCheck, jwtParse } from '../middleware/auth.js';
import CartController from '../controller/CartController.js';


const router = express.Router();


router.post('/',jwtCheck,jwtParse,CartController.addUpdateCart)
router.get('/',jwtCheck,jwtParse,CartController.getCart)
router.delete('/',jwtCheck,jwtParse,CartController.deleteCart)
router.put('/',jwtCheck,jwtParse,CartController.decreseCartCount)


export default router