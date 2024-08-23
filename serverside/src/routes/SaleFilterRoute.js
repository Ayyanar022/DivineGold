import express from 'express';
import SaleFilterController from '../controller/SaleFilterController.js';

const router = express.Router();

router.get('/',SaleFilterController.getFilterSaleItems)

export default router;