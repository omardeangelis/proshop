import Order from "../models/Order.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../middleware/asyncErrorHandler.js";

//desc      Creare un ordine
//Route     POST /api/order
//Access    Private Active
export const createNewOrder = asyncHandler(async (req, res, next) => {
  const { paymentMethod } = req.body;
  const order = await Order.create({
    user: req.user.id,
    orderItems: res.cart.userCart,
    shippingAddress: res.shipping,
    paymentMethod,
    shippingPrice: res.cart.shippingPrice,
    totalPrice: res.cart.totalPrice,
  });
  res.status(201).json({
    success: true,
    data: order,
  });
});

//desc      Creare un ordine
//Route     GET /api/order/:id
//Access    Private Active
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorResponse(`Nessun Ordine con id ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    data: order,
  });
});

//desc      Creare un ordine
//Route     GET /api/order/myorder
//Access    Private
export const getMyOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });
  if (!order) {
    return next(new ErrorResponse(`Nessun ordine ancora creato`, 404));
  }
  res.status(200).json({
    success: true,
    data: order,
  });
});
