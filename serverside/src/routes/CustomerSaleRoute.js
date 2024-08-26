import express from 'express';
import CustomerSale from '../controller/CustomerSaleController.js';
import { jwtCheck, jwtParse } from '../middleware/auth.js';

const router = express.Router()

router.get('/get-customer/:mobileNo',jwtCheck,jwtParse,CustomerSale.getCustomer);
router.post('/',jwtCheck,jwtParse,CustomerSale.AddSaleItem);


export default router