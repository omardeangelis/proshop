import axios from "axios";

import {
  GET_SHIPPING_ADDRESS_FAILED,
  GET_SHIPPING_ADDRESS_START,
  GET_SHIPPING_ADDRESS_SUCCESS,
  CREATE_SHIPPING_ADDRESS_START,
  CREATE_SHIPPING_ADDRESS_SUCCESS,
  CREATE_SHIPPING_ADDRESS_FAILED,
  UPDATE_SHIPPING_ADDRESS_STARTED,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_FAILED,
  UPDATE_SHIPPING_POST_SUCCESS,
} from "../constants/shippingConstant";

export const getUserShippingAddress = () => async (dispatch) => {
  dispatch({ type: GET_SHIPPING_ADDRESS_START });
  try {
    const { data } = await axios.get("/api/shipping");
    dispatch({ type: GET_SHIPPING_ADDRESS_SUCCESS, payload: data.data });
    localStorage.setItem("shippingAddress", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: GET_SHIPPING_ADDRESS_FAILED,
      payload: error.response.data.error,
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////
//CREA NUOVO INDIRIZZO SPEDIZIONE
export const createShippingAddress = (state) => async (dispatch) => {
  dispatch({ type: CREATE_SHIPPING_ADDRESS_START });
  try {
    const {
      data: { data },
    } = await axios.post(
      "api/shipping",
      { ...state },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //Cambiare risposta POST eliminando user dalla risposta
    dispatch({ type: CREATE_SHIPPING_ADDRESS_SUCCESS });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_SHIPPING_ADDRESS_FAILED,
      payload: error.response.data.error,
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////
//MODIFICA INDIRIZZO DI SPEDIZIONE
export const updateUserShippingAddress = (input) => async (dispatch) => {
  dispatch({ type: UPDATE_SHIPPING_ADDRESS_STARTED });
  console.log(input);
  try {
    const {
      data: { data },
    } = await axios.put(
      "api/shipping",

      {
        indirizzo1: input.indirizzo1,
        indirizzo2: input.indirizzo2,
        city: input.city,
        paese: input.paese,
        cap: input.cap,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //Cambiare risposta POST eliminando user dalla risposta
    dispatch({ type: UPDATE_SHIPPING_ADDRESS_SUCCESS });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_SHIPPING_ADDRESS_FAILED,
      payload: error.response.data.error,
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////
export const shippingUpdateSuccess = () => async (dispatch) => {
  dispatch({ type: UPDATE_SHIPPING_POST_SUCCESS });
};
