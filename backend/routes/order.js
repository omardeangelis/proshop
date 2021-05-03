import express from "express";
import bodyParser from "body-parser";
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
  stripeOrder,
  getMyOrder,
  getOrderById,
  payOrder,
} from "../controller/order.js";

const router = express.Router();
//Conferma ordine Dopo Pagamento
router.post(
  "/checkout/webhook",
  express.raw({ type: "application/json" }),
  payOrder
);
//Authorizzatore per protect Function
router.use(authRouteValidator);

//Ottengo tutti i miei ordini
router.get("/myorder", getMyOrder);

//Funzioni Riservate per utenti già attivati
router.use(activeValidator);

//Crea un nuovo Ordine
router.post("/", cartValidator, shippingValidator, createNewOrder, stripeOrder);

//Ottengo Ordine con ID
router.route("/:id").get(getOrderById);

export default router;
