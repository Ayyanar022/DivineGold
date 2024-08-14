import express from 'express';
import { jwtCheck, jwtParse } from '../middleware/auth.js';
import ExploreController from '../controller/ExploreController.js';

const router = express.Router();

router.get('/single/:id',jwtCheck,jwtParse,ExploreController.getSingleJEwellDesignData)
router.get('/filter',jwtCheck,jwtParse,ExploreController.getFilterJEwellDesignData)

export default router