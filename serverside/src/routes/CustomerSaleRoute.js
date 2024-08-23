import express from 'express';
import CustomerSale from '../controller/CustomerSaleController.js';

const router = express.Router()

router.get('/get-customer/:mobileNo',CustomerSale.getCustomer);
router.post('/',CustomerSale.AddSaleItem);


export default router