import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createProductByAdmin,
  deleteProduct,
  destroyProductFromDB,
} from "../controller/products.js";
// Auth Validator
import {
  adminValidator,
  activeValidator,
  authRouteValidator,
} from "../middleware/authValidator.js";
const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    authRouteValidator,
    adminValidator,
    activeValidator,
    createProductByAdmin
  );
router
  .route("/:id")
  .get(getSingleProduct)
  .put(authRouteValidator, adminValidator, activeValidator, updateProduct)
  .delete(authRouteValidator, adminValidator, activeValidator, deleteProduct);

router.delete(
  "/:id/destroy",
  authRouteValidator,
  adminValidator,
  activeValidator,
  destroyProductFromDB
);

export default router;
