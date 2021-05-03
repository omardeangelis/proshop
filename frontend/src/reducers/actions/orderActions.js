import {
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
} from "../constants/orderConstants";
//Axios
import axios from "axios";
// Stripe
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IZZ2BBaYpAXNxxlAIZ5yTrTi7VFUFTKKUzKBTzIwYzGnRdDg3fQFSLFEMvdW5Ieh1fi4noWFPYBzu6xoqiwVXwz00aR8aanI7"
);

//Crea un nuovo Ordine
export const createNewOrder = () => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_START });
  try {
    const stripe = await stripePromise;
    const response = await axios.post(
      "/api/order",
      {
        cart: getState().cart.cartItems,
        paymentMethod: "card",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // When the customer clicks on the button, redirect them to Checkout.
    await stripe.redirectToCheckout({
      sessionId: response.data.session,
    });
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data.session });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILED,
      payload: error.response.data.error,
    });
  }
};
