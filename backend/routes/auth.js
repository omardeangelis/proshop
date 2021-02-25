import express from "express";
import {
  createNewUser,
  userLogin,
  getMe,
  updatePassword,
  updateUserInfo,
} from "../controller/auth.js";
import { authRouteValidator } from "../middleware/authValidator.js";
const router = express.Router();

router.post("/register", createNewUser);
router.post("/login", userLogin);

//Authorized Route
router.use(authRouteValidator);
router.get("/me", getMe);
router.put("/updateinfo", updateUserInfo);
router.put("/updatepassword", updatePassword);

export default router;
