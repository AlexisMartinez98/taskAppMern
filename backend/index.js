import express from "express";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
