import axios from "axios";
import {
  LOGIN_REQUEST_FAILED,
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_SUCCESS,
  NEW_LOGIN_ATTEMPT,
  USER_LOGOUT_REQUEST,
} from "../constants/loginConstants";

export const tryLoginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST_STARTED });

  try {
    const { data } = await axios.post(
      "/api/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: LOGIN_REQUEST_SUCCESS });
    console.log(data);
    localStorage.setItem("isLogin", "true");
  } catch (error) {
    dispatch({
      type: LOGIN_REQUEST_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const newLoginAttempt = () => async (dispatch) => {
  dispatch({ type: NEW_LOGIN_ATTEMPT });
};

export const userLogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  localStorage.removeItem("isLogin");
};
