import express from "express";
import { authRouteValidator } from "../middleware/authValidator.js";
import {
  getUserShippingAddress,
  createUserShippingAddress,
  updateUserShippingAddress,
  deleteUserShippingAddress,
} from "../controller/shipping.js";
const router = express.Router();

router.use(authRouteValidator);
router
  .route("/")
  .get(getUserShippingAddress)
  .post(createUserShippingAddress)
  .put(updateUserShippingAddress, createUserShippingAddress)
  .delete(deleteUserShippingAddress);

export default router;
