import Express from "express";
const router = Express.Router();
import {
  register,
  autentication,
  confirm,
} from "../controllers/usersController.js";

// autentication, register and users confirm
router.post("/", register);
router.post("/login", autentication);
router.get("/confirm/:token", confirm);

export default router;
