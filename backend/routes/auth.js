import express from "express";
import { createNewUser, userLogin, getMe } from "../controller/auth.js";
import { authRouteValidator } from "../middleware/authValidator.js";
const router = express.Router();

router.post("/register", createNewUser);

router.post("/login", userLogin);

router.get("/me", authRouteValidator, getMe);

export default router;
