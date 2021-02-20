import asyncHandler from "../middleware/asyncErrorHandler.js";
import Product from "../models/Product.js";
import ErrorReponse from "../utils/ErrorResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";

//desc      Fetch all data
//Route     GET /api/products
//Access    Public
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    data: products,
  });
});

//desc      Fetch one product by is ID
//Route     GET /api/products/:id
//Access    Public
export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorReponse(`Nessun prodotto con id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});
