import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute.js";
import adminRoutes from "./routes/AdminRoute.js";
import fairPriceRoutes from "./routes/FairPriceRout.js";
import exploreRoutes from "./routes/ExoloreRoute.js";
import cartRoute from "./routes/CartRout.js";
import customerSale from "./routes/CustomerSaleRoute.js";
import salefilter from "./routes/SaleFilterRoute.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/my/user",myUserRoute);
app.use("/api/admin",adminRoutes);
app.use("/api/fairPrice",fairPriceRoutes);
app.use("/api/explore",exploreRoutes);
app.use("/api/cart",cartRoute);
app.use("/api/admin/customersale",customerSale);
app.use("/api/admin/filter",salefilter);

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("connected to DB"))

const PORT = process.env.PORT || 7000;  // Use the port provided by Render or fall back to 7000 for local development

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

