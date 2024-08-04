import express from 'express';
import { jwtCheck, jwtParse } from '../middleware/auth.js';
import ExploreController from '../controller/ExploreController.js';

const router = express.Router();

router.get('/:id',jwtCheck,jwtParse,ExploreController.getSingleJEwellDesignData)

export default router