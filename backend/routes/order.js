import express from "express";
//Middleware
import {
  adminValidator,
  authRouteValidator,
  activeValidator,
} from "../middleware/authValidator.js";
import {
  cartValidator,
  shippingValidator,
} from "../middleware/cartValidator.js";
//Controller
import {
  createNewOrder,
  getMyOrder,
  getOrderById,
} from "../controller/order.js";

const router = express.Router();

//Authorizzatore per protect Function
router.use(authRouteValidator);
router.get("/myorder", getMyOrder);

//Funzioni Riservate per utenti già attivati
router.use(activeValidator);

router.post("/", cartValidator, shippingValidator, createNewOrder);
router.route("/:id").get(getOrderById);

export default router;
