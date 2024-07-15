import express from "express"
import AdminController from "../controller/AdminController.js";

const router = express.Router();

router.get("/",AdminController.getAllUser);

export default router;