import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  TOGGLE_CART_ITEM_QTY,
  REMOVE_ALL_FROM_CART,
} from "../constants/cartConstants";
import axios from "axios";

//Aggiungo prodotti al carrello
//Il secondo parametro getState, ci da accesso a tutti gli state della nostra app
export const addProductToCart = (id, qty) => async (dispatch, getState) => {
  const {
    data: { data },
  } = await axios.get(`/api/products/${id}`);
  const { image, countInStock, _id, name, price } = data;

  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: { _id, qty, name, countInStock, image, price },
  });

  //inserisco cartItems nel localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeProductFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: id });

  //Inserisco nuovoCartItemsState nel localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Diminuisco o aumento qty dell'elemento nel carrello
export const toggleCartItemQty = (_id, type = "add") => async (
  dispatch,
  getState
) => {
  dispatch({ type: TOGGLE_CART_ITEM_QTY, payload: { _id, type } });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Svuota il Carrello
export const removeAllFromCart = () => async (dispatch) => {
  dispatch({ type: REMOVE_ALL_FROM_CART });
  localStorage.removeItem("cartItems");
};
