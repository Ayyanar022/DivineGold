import express from 'express';
import CustomerSale from '../controller/CustomerSaleController.js';

const router = express.Router()

router.get('/get-customer/:mobileNo',CustomerSale.getCustomer)

export default router