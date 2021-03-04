import {
  SEND_ACTIVATION_TOKEN_FAILED,
  SEND_ACTIVATION_TOKEN_SUCCESS,
  SEND_ACTIVATION_TOKEN_STARTED,
  PROFILE_ACTIVATION_STARTED,
  PROFILE_ACTIVATION_SUCCESS,
  PROFILE_ACTIVATION_FAILED,
  SEND_RESET_PASSWORD_TOKEN_STARTED,
  SEND_RESET_PASSWORD_TOKEN_FAILED,
  SEND_RESET_PASSWORD_TOKEN_SUCCESS,
  RESET_SEND_PASSWORD_TOKEN,
  PASSWORD_RESET_STARTED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  RESET_PASSWORD_STATE,
} from "../constants/validationContants";
import axios from "axios";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

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

////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////

export const sendPasswordTokenReset = (email) => async (dispatch) => {
  dispatch({ type: SEND_RESET_PASSWORD_TOKEN_STARTED });
  try {
    await axios.post("/api/auth/forgotpassword", { email }, axiosConfig);
    dispatch({ type: SEND_RESET_PASSWORD_TOKEN_SUCCESS });
  } catch (error) {
    dispatch({
      type: SEND_RESET_PASSWORD_TOKEN_FAILED,
      payload: error.response.data.error,
    });
  }
};

////////////////////////////////////////////////////////////////////////

export const resetPasswordTokenResult = () => async (dispatch) => {
  dispatch({ type: RESET_SEND_PASSWORD_TOKEN });
};

////////////////////////////////////////////////////////////////////////

export const resetUserPassword = (newpassword, token) => async (dispatch) => {
  dispatch({ type: PASSWORD_RESET_STARTED });
  try {
    await axios.put(
      `/api/auth/resetpassword/${token}`,
      { newpassword },
      axiosConfig
    );
    dispatch({ type: PASSWORD_RESET_SUCCESS });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAILED,
      payload: error.response.data.error,
    });
  }
};

////////////////////////////////////////////////////////////////////////

export const resetPasswordState = () => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_STATE });
};
