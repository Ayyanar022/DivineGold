import express from 'express';
import MyUserController from '../controller/MyUserController.js'; 
import { jwtCheck } from '../middleware/auth.js';

const router = express.Router();

router.post("/",jwtCheck, MyUserController.createCurrentUser);

export default router;
