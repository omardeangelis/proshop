import {
  SEND_ACTIVATION_TOKEN_FAILED,
  SEND_ACTIVATION_TOKEN_SUCCESS,
  SEND_ACTIVATION_TOKEN_STARTED,
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
export const sendActivationToken = () => async (dispatch) => {
  dispatch({ type: SEND_ACTIVATION_TOKEN_STARTED });
  try {
    await axios.get("/api/auth/activeuser");
    dispatch({ type: SEND_ACTIVATION_TOKEN_SUCCESS });
  } catch (error) {
    dispatch({
      type: SEND_ACTIVATION_TOKEN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
