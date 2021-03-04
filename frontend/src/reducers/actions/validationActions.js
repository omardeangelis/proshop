import {
  SEND_ACTIVATION_TOKEN_FAILED,
  SEND_ACTIVATION_TOKEN_SUCCESS,
  SEND_ACTIVATION_TOKEN_STARTED,
  PROFILE_ACTIVATION_STARTED,
  PROFILE_ACTIVATION_SUCCESS,
  PROFILE_ACTIVATION_FAILED,
} from "../constants/validationContants";
import axios from "axios";

//   {
//     email,
//     password,
//   },
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }

//Invia il token di attivazione per il profilo se richeista manualmente
export const sendActivationToken = () => async (dispatch) => {
  dispatch({ type: SEND_ACTIVATION_TOKEN_STARTED });
  try {
    await axios.get("/api/auth/activeuser");
    dispatch({ type: SEND_ACTIVATION_TOKEN_SUCCESS });
  } catch (error) {
    dispatch({
      type: SEND_ACTIVATION_TOKEN_FAILED,
      payload: error.response.data.error,
    });
  }
};

//Valida e attiva il profilo dell'utente anche se non è loggato
export const profileActivation = (token) => async (dispatch) => {
  dispatch({ type: PROFILE_ACTIVATION_STARTED });
  try {
    await axios.get(`/api/auth/activeuser/${token}`);
    dispatch({ type: PROFILE_ACTIVATION_SUCCESS });
    localStorage.setItem("isActive", "true");
  } catch (error) {
    dispatch({
      type: PROFILE_ACTIVATION_FAILED,
      payload: error.response.data.error,
    });
  }
};
