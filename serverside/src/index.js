import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute.js";
import adminRoutes from "./routes/AdminRoute.js";
import fairPriceRoutes from "./routes/FairPriceRout.js"
import exploreRoutes from "./routes/ExoloreRoute.js"
import cartRoute from "./routes/CartRout.js";


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user",myUserRoute);
app.use("/api/admin",adminRoutes);
app.use("/api/fairPrice",fairPriceRoutes);
app.use("/api/explore",exploreRoutes)
app.use("/api/cart",cartRoute)

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("connected to DB"))

app.listen(7000, () => {
  console.log("server on localhost:7000");
});
