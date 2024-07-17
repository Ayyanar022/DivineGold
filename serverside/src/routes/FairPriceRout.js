import express from 'express'
import FairPriceController from '../controller/FairPriceController.js';

    const router = express.Router();

    router.get('/',FairPriceController.getAllFairPriceList)

    export default router