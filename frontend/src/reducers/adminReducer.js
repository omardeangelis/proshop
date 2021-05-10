import {
  DELETE_USER_FAILED,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  GET_USERS_LIST_FAILED,
  GET_USERS_LIST_RESET,
  GET_USERS_LIST_START,
  GET_USERS_LIST_SUCCESS,
  GET_USER_DETAIL_BY_ADMIN_RESET,
  GET_USER_DETAIL_BY_ADMIN_START,
  GET_USER_DETAIL_BY_ADMIN_SUCCESS,
  RESET_UPDATE_USER_DETAIL_ADMIN_ERROR,
  RESET_UPDATE_USER_DETAIL_ADMIN_SUCCESS,
  UPDATE_USER_DETAIL_ADMIN_FAILED,
  UPDATE_USER_DETAIL_ADMIN_START,
  UPDATE_USER_DETAIL_ADMIN_SUCCESS,
} from "./constants/adminContants";

export const getUserListReducer = (
  state = { users: [], isLoading: true },
  { type, payload }
) => {
  switch (type) {
    case GET_USERS_LIST_START:
      return { isLoading: true };
    case GET_USERS_LIST_SUCCESS:
      return { isLoading: false, users: payload };
    case GET_USERS_LIST_FAILED:
      return { isLoading: false, error: payload };
    case GET_USERS_LIST_RESET:
      return { users: [], isLoading: true };
    case GET_USER_DETAIL_BY_ADMIN_START:
      return { ...state, isLoading: true };
    case GET_USER_DETAIL_BY_ADMIN_SUCCESS:
      return { ...state, isLoading: false, singleUser: payload };
    case GET_USER_DETAIL_BY_ADMIN_RESET:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_USER_START:
      return { isLoading: true };
    case DELETE_USER_SUCCESS:
      return { isLoading: false, success: true };
    case DELETE_USER_FAILED:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};

export const updateUserByAdminReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_DETAIL_ADMIN_START:
      return { isLoading: true };
    case UPDATE_USER_DETAIL_ADMIN_SUCCESS:
      return { isLoading: false, success: true };
    case UPDATE_USER_DETAIL_ADMIN_FAILED:
      return { isLoading: false, success: false, error: payload };
    case RESET_UPDATE_USER_DETAIL_ADMIN_SUCCESS:
      return { ...state, success: false };
    case RESET_UPDATE_USER_DETAIL_ADMIN_ERROR:
      return { ...state, error: false };
    default:
      return state;
  }
};
