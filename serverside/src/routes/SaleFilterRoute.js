import express from 'express';
import SaleFilterController from '../controller/SaleFilterController.js';
import { jwtCheck, jwtParse } from '../middleware/auth.js';

const router = express.Router();

router.get('/',jwtCheck,jwtParse,SaleFilterController.getFilterSaleItems)

export default router;