import axios from "axios";
import {
  LOGIN_REQUEST_FAILED,
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  REGISTER_REQUEST_STARTED,
  REGISTER_REQUEST_SUCCESS,
  NEW_REGISTER_ATTEMPT,
  NEW_LOGIN_ATTEMPT,
  USER_LOGOUT_REQUEST,
} from "../constants/loginConstants";

//User fa il login tramita la Login Screen
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
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
  } catch (error) {
    dispatch({
      type: LOGIN_REQUEST_FAILED,
      payload: error.response.data.error,
    });
  }
};

//Elimino messaggio di errore
export const newLoginAttempt = () => async (dispatch) => {
  dispatch({ type: NEW_LOGIN_ATTEMPT });
};

//Elimino messaggio di errore
export const newRegisterAttempt = () => async (dispatch) => {
  dispatch({ type: NEW_REGISTER_ATTEMPT });
};

////////////////////////////////////////////////////////////////////////////////////////

//User fa logout
export const userLogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  localStorage.removeItem("isLogin");
  localStorage.removeItem("isAdmin");
};

//User si registra tramita la Register Screen
export const userRegister = (name, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST_STARTED });

  try {
    const { data } = await axios.post(
      "/api/auth/register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    dispatch({ type: REGISTER_REQUEST_SUCCESS });
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
    dispatch({ type: LOGIN_REQUEST_SUCCESS });
  } catch (error) {
    dispatch({
      type: REGISTER_REQUEST_FAILED,
      payload: error.response.data.error,
    });
  }
};
