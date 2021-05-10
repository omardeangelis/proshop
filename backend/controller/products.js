import asyncHandler from "../middleware/asyncErrorHandler.js";
import Product from "../models/Product.js";
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
      new ErrorResponse(`Nessun prodotto con id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

//desc      Crea un nuovo Prodotto
//Route     POST /api/products/
//Access    Private/Admin
export const createProductByAdmin = asyncHandler(async (req, res, next) => {
  const product = await Product.create({
    name: "Nome Prodotto",
    image: "/images/default.png",
    description: "Modifica Descrizione",
    price: 1,
    countInStock: 0,
    user: req.user.id,
    isDeleted: false,
    category: "Default",
    brand: "Default",
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

//desc      Admin Modifica un prodotto
//Route     PUT /api/products/:id/edit
//Access    Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  const fieldToUpdate = { ...req.body };
  for (const [key, value] of Object.values(fieldToUpdate)) {
    if (!value) {
      delete fieldToUpdate[key];
    }
  }

  if (!fieldToUpdate) {
    return next(
      new ErrorResponse("Inserisci almento un campo da modificare", 400)
    );
  }

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Il Prodotto non esiste", 404));
  } else {
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { ...fieldToUpdate } },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      success: true,
      data: product,
    });
  }
});

//desc      Elimina Un prodotto (setta voce isDeleted = true sul prodotto )
//Route     DELETE /api/products/:id
//Access    Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Nessun prodotto con id: ${req.params.id}`, 404)
    );
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: { isDeleted: true } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: product,
  });
});

//desc      Elimina Un prodotto definitivamente da DB
//Route     DELETE /api/products/:id/destroy
//Access    Private/Admin
export const destroyProductFromDB = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Nessun prodotto con id: ${req.params.id}`, 404)
    );
  }

  await Product.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    data: "cancellato",
  });
});
