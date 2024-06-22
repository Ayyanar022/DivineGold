import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.json({ message: "test" });
});

app.listen(7000, () => {
  console.log("server on localhost:7000");
});
