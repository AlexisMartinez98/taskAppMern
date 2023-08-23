import Express from "express";
const router = Express.Router();
import {
  register,
  autentication,
  confirm,
  forgetPassword,
  comprobationToken,
} from "../controllers/usersController.js";

// autentication, register and users confirm
router.post("/", register);
router.post("/login", autentication);
router.get("/confirm/:token", confirm);
router.post("/forgetPassword", forgetPassword);
router.get("/forgetPassword/:token", comprobationToken);

export default router;
