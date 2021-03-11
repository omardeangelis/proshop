import Product from "../models/Product.js";
import Shipping from "../models/ShippingAddress.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../middleware/asyncErrorHandler.js";
import mongoose from "mongoose";

//Trova sul database la lista di prodotti inviati dall'utente e crea
//res.cart = {totalPrice: num, shippingPrice: num, userCart: [...{..._doc}]}
export const cartValidator = asyncHandler(async (req, res, next) => {
  const { cart } = req.body;
  //ID di prodotti presenti nel carrello
  const cart_ids = cart.map((product) => product._id);
  //Ritorna Array di oggetti
  const records = await Product.find({ _id: { $in: cart_ids } }).select([
    "price",
    "image",
    "name",
  ]);

  //Ritorna un nuovo array in cui aggiungo anche la quantità degli item e
  //creando la chiave product === _id
  const userCart = records.map(({ _doc }) => {
    let index = cart.findIndex(
      (product) => product._id === _doc._id.toString()
    );
    return { ..._doc, qty: cart[index].qty, product: _doc._id };
  });

  //Elimina chiave _id perché ora è contenuto in products
  userCart.forEach((item) => {
    delete item["_id"];
  });
  //Calcola il costo degli elementi passati nel carrello
  const totalPrice = userCart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const shippingPrice = ((totalPrice / 100) * 1.4).toFixed(2);
  //Inserisco nella risposta il prezzo totale ed il carrello
  res.cart = {
    totalPrice,
    userCart,
    shippingPrice,
  };

  next();
});

//In caso di indirizzo di spedizione mancante controlla se utente abbia
//Indirizzo di spedizione salvato e crea res.shipping
export const shippingValidator = asyncHandler(async (req, res, next) => {
  const { shippingAddress } = req.body;
  if (shippingAddress) {
    res.shipping = shippingAddress;
    next();
  } else {
    const shipping = await Shipping.findOne({ user: req.user.id });
    if (!shipping) {
      return next(new ErrorResponse(`Inserisci indirizzo di spedizione`));
    }
    res.shipping = shipping;
    next();
  }
});
