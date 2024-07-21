import express from 'express'
import FairPriceController from '../controller/FairPriceController.js';
import { jwtCheck, jwtParse } from '../middleware/auth.js';

    const router = express.Router();

    router.get('/',jwtCheck,jwtParse,FairPriceController.getAllFairPriceList)
    router.get('/:itemName/:category',jwtCheck,jwtParse,FairPriceController.getSingleFairPriceDetails)


    export default router