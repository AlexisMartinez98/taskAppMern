import Express from "express";
const router = Express.Router();
import { register } from "../controllers/usersController.js";

// autentication, register and users confirm
router.post("/", register);

export default router;
