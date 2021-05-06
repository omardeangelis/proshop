import {
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  GET_MY_ORDERS_START,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAILED,
} from "../constants/orderConstants";
//Axios
import axios from "axios";

//Utils
import { paginator } from "../../utils/helpers";
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

//Ritorna tutti gli ordini dell'utente
export const getAllUserOrders = () => async (dispatch) => {
  dispatch({ type: GET_MY_ORDERS_START });
  try {
    const response = await axios.get(`api/order/myorder`);
    dispatch({
      type: GET_MY_ORDERS_SUCCESS,
      payload: paginator(response.data.data),
    });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAILED,
      payload: error.response.data.error,
    });
  }
};
