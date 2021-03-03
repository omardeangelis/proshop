import express from "express";
import {
  createNewUser,
  userLogin,
  getMe,
  updatePassword,
  updateUserInfo,
  logoutUser,
  activeUser,
  newUserActiveValidation,
  sendPasswordTokenReset,
  resetPassword,
} from "../controller/auth.js";
import { authRouteValidator } from "../middleware/authValidator.js";
const router = express.Router();

router.post("/register", createNewUser);
router.post("/login", userLogin);
router.get("/activeuser/:token", activeUser);
router.post("/forgotpassword", sendPasswordTokenReset);
router.put("/resetpassword/:token", resetPassword);

//Authorized Route
router.use(authRouteValidator);
router.get("/me", getMe);
router.put("/updateinfo", updateUserInfo);
router.put("/updatepassword", updatePassword);
router.get("/logout", logoutUser);
router.get("/activeuser", newUserActiveValidation);

export default router;
