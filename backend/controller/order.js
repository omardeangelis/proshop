import Order from "../models/Order.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../middleware/asyncErrorHandler.js";
import sendMail from "../utils/sendMail.js";
//Stripe
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SK_KEY);
const YOUR_DOMAIN = "http://localhost:3000/placeorder";
//desc      Creare un ordine
//Route     POST /api/order
//Access    Private Active
export const createNewOrder = asyncHandler(async (req, res, next) => {
  const { paymentMethod } = req.body;
  const order = await Order.create({
    user: req.user.id,
    orderItems: res.locals.cart.userCart,
    shippingAddress: res.locals.shipping,
    paymentMethod,
    shippingPrice: res.locals.cart.shippingPrice,
    totalPrice: res.locals.cart.totalPrice,
  });

  //Passa informazioni al prossimo middleware per gestire pagamento con stripe
  res.locals.order = order;
  next();
});

//desc      Ottenere Ordine un ordine
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

//desc      Ottenere ordini utente
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

export const stripeOrder = asyncHandler(async (req, res, next) => {
  const orderData = res.locals.cart.userCart.map((el) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: el.name,
          images: [`../../frontend/public${el.image}`],
        },
        unit_amount: el.price * 100,
      },
      quantity: el.qty,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create(
      {
        // customer_email: req.user.email || "",
        // submit_type: "Acquista",
        payment_method_types: ["card"],
        line_items: [...orderData],
        mode: "payment",
        metadata: {
          order_id: res.locals.order._id.toString(),
        },
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      },
      {
        apiKey: process.env.STRIPE_SK_KEY,
      }
    );
    res.status(200).json({
      success: true,
      data: res.locals.order,
      session: session.id,
    });
  } catch (err) {
    return next(
      new ErrorResponse(`Impossibile completare operazione di pagamento`, 500)
    );
  }
});

//Webhook per confermare pagamento e ottenere la risposta da Stripe
export const payOrder = asyncHandler(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SIGNATURE
    );
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 400));
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    res.locals.session = session;
    console.log(session.customer_details.email);
    console.log("log");
    const isPaid = session.payment_status === "paid" ? true : false;
    await Order.findByIdAndUpdate(
      session.metadata.order_id,
      {
        $set: {
          isPaid,
          paymentResult: {
            id: session.id,
            status: session.payment_status,
            update_time: Date.now().toString(),
            email_address: session.customer_details.email,
          },
          paidAt: new Date(Date.now()),
        },
      },
      { new: true, runValidators: true }
    );
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent,
      {
        apiKey: process.env.STRIPE_SK_KEY,
      }
    );
    let ricevuta = "";
    for (const [key, value] of Object.entries(paymentIntent.charges.data[0])) {
      if (key === "receipt_url") {
        ricevuta = value;
      }
    }
    try {
      await sendMail({
        to: session.customer_details.email,
        subject: "Conferma di Acquisto",
        text: `Grazie per aver completato l'acquisto: Ecco la tua ricevuta \n\n ${ricevuta}`,
      });
    } catch (error) {
      return next(
        new ErrorResponse("Impossibile completare inviare mail", 500)
      );
    }
  }
  res.status(200).json({});
});
