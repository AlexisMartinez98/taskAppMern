import Express from "express";
const router = Express.Router();
import {
  register,
  autentication,
  confirm,
  forgetPassword,
  comprobationToken,
  newPassword,
  profil,
} from "../controllers/usersController.js";
import checkAuth from "../middleware/checkAuth.js";

// autentication, register and users confirm
router.post("/", register);
router.post("/login", autentication);
router.get("/confirm/:token", confirm);
router.post("/forgetPassword", forgetPassword);
router.route("/forgetPassword/:token").get(comprobationToken).post(newPassword);

router.get("/profil", checkAuth, profil);

export default router;
