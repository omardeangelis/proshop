import {
  DELETE_USER_FAILED,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  GET_USERS_LIST_FAILED,
  GET_USERS_LIST_RESET,
  GET_USERS_LIST_START,
  GET_USERS_LIST_SUCCESS,
  GET_USER_DETAIL_BY_ADMIN_FAILED,
  GET_USER_DETAIL_BY_ADMIN_RESET,
  GET_USER_DETAIL_BY_ADMIN_START,
  GET_USER_DETAIL_BY_ADMIN_SUCCESS,
  UPDATE_USER_DETAIL_ADMIN_START,
  UPDATE_USER_DETAIL_ADMIN_SUCCESS,
  UPDATE_USER_DETAIL_ADMIN_FAILED,
  RESET_UPDATE_USER_DETAIL_ADMIN_ERROR,
  RESET_UPDATE_USER_DETAIL_ADMIN_SUCCESS,
} from "../constants/adminContants";
import axios from "axios";

export const adminGetUserList = () => async (dispatch) => {
  dispatch({ type: GET_USERS_LIST_START });
  try {
    const response = await axios.get("/api/auth/users");
    console.log(response);
    dispatch({ type: GET_USERS_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USERS_LIST_FAILED,
      payload: error.response.data.error,
    });
  }
};

//Resetta user a vuoto
export const resetUserListState = () => async (dispatch) => {
  dispatch({ type: GET_USERS_LIST_RESET });
};

//Cancella user con id
export const deleteUser = (_id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_START });

  try {
    await axios.delete(`/api/auth/user/${_id}`);
    dispatch({ type: DELETE_USER_SUCCESS });
    dispatch({ type: GET_USERS_LIST_RESET });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILED,
      payload: error.response.data.error,
    });
  }
};

//Ottengo informazioni dell'user da parte di un admin nell'admin Screen
export const getSingleUserByAdmin = (_id) => async (dispatch) => {
  dispatch({ type: GET_USER_DETAIL_BY_ADMIN_START });
  try {
    const response = await axios.get(`/api/auth/user/${_id}`);
    dispatch({
      type: GET_USER_DETAIL_BY_ADMIN_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_DETAIL_BY_ADMIN_FAILED,
      payload: error.response.data.error,
    });
  }
};

//Ottengo informazioni dell'user da parte di un admin nell'admin Screen
export const resetSingleUserState = () => async (dispatch) => {
  dispatch({ type: GET_USER_DETAIL_BY_ADMIN_RESET });
};

//modifica le informazioni dell'utente da parte di un admin
export const updateUserDetailByAdmin = (_id, input) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_DETAIL_ADMIN_START });
  try {
    const response = await axios.put(
      `/api/auth/user/${_id}`,
      {
        name: input.name,
        email: input.email,
        isAdmin: JSON.stringify(input.isAdmin),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: UPDATE_USER_DETAIL_ADMIN_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAIL_ADMIN_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const resetUserUpdateByAdminState = (resetType) => async (dispatch) => {
  if (resetType === "error") {
    dispatch({ type: RESET_UPDATE_USER_DETAIL_ADMIN_ERROR });
  }
  if (resetType === "success") {
    dispatch({ type: RESET_UPDATE_USER_DETAIL_ADMIN_SUCCESS });
  }
};
