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
  PROFILE_REQUEST_FAILED,
  PROFILE_REQUEST_STARTED,
  PROFILE_REQUEST_SUCCESS,
  UPDATE_PROFILE_REQUEST_STARTED,
  UPDATE_PROFILE_REQUEST_SUCCESS,
  UPDATE_PROFILE_REQUEST_FAILED,
  PROFILE_REQUEST_RESET,
  UPDATE_PASSWORD_REQUEST_STARTED,
  UPDATE_PASSWORD_REQUEST_SUCCESS,
  UPDATE_PASSWORD_REQUEST_FAILED,
  UPDATE_PASSWORD_POST_SUCCESS,
  UPDATE_PROFILE_POST_SUCCESS,
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
    dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: data.isAdmin });
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
    localStorage.setItem("isAdmin", JSON.stringify(data.isActive));
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

////////////////////////////////////////////////////////////////////////////////////////

//User fa logout
export const userLogout = () => async (dispatch) => {
  await axios.get("api/auth/logout");
  dispatch({ type: USER_LOGOUT_REQUEST });
  localStorage.clear();
};

////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////

//Elimino messaggio di errore
export const newRegisterAttempt = () => async (dispatch) => {
  dispatch({ type: NEW_REGISTER_ATTEMPT });
};

////////////////////////////////////////////////////////////////////////////////////////

export const fetchProfileData = () => async (dispatch) => {
  dispatch({ type: PROFILE_REQUEST_STARTED });
  try {
    const {
      data: { data },
    } = await axios.get("/api/auth/me");
    dispatch({ type: PROFILE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_REQUEST_FAILED,
      payload: error.response.data.error,
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////

export const resetUserProfileInfo = () => async (dispatch) => {
  dispatch({ type: PROFILE_REQUEST_RESET });
};

////////////////////////////////////////////////////////////////////////////////////////

export const updateProfile = (name, email) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST_STARTED });
  try {
    const {
      data: { data },
    } = await axios.put(
      "/api/auth/updateinfo",
      { name, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: UPDATE_PROFILE_REQUEST_SUCCESS, payload: data });
    dispatch({ type: PROFILE_REQUEST_RESET });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_REQUEST_FAILED,
      payload: error.response.data.error,
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////
export const profileUpdateSuccess = () => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_POST_SUCCESS });
};

////////////////////////////////////////////////////////////////////////////////////////

export const updatePassword = (currentPassword, newPassword) => async (
  dispatch
) => {
  dispatch({ type: UPDATE_PASSWORD_REQUEST_STARTED });
  try {
    await axios.put(
      "/api/auth/updatepassword",
      { currentPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: UPDATE_PASSWORD_REQUEST_SUCCESS });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: UPDATE_PASSWORD_REQUEST_FAILED,
      payload: error.response.data.error,
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////
export const passwordUpdateSuccess = () => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_POST_SUCCESS });
};
