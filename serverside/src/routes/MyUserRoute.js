import express from 'express';
import MyUserController from '../controller/MyUserController.js'; 

const router = express.Router();

router.post("/", MyUserController.createCurrentUser);

export default router;
