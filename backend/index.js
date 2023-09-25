import express from "express";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

dbConnection();

//Routing
app.use("/api/users", userRoutes);
app.use("/api/project", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
