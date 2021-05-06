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
  getAllUsers,
  getUserByAdmin,
  deleteUserByAdmin,
  updateUserByAdmin,
} from "../controller/auth.js";
import {
  authRouteValidator,
  adminValidator,
} from "../middleware/authValidator.js";
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

//Authorized and Admin Route
router.use(adminValidator);
router.route("/users").get(getAllUsers);
router
  .route("/user/:id")
  .get(getUserByAdmin)
  .put(updateUserByAdmin)
  .delete(deleteUserByAdmin);
export default router;
