import {
  LOGIN_REQUEST_FAILED,
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_SUCCESS,
  NEW_LOGIN_ATTEMPT,
  REGISTER_REQUEST_FAILED,
  REGISTER_REQUEST_STARTED,
  REGISTER_REQUEST_SUCCESS,
  NEW_REGISTER_ATTEMPT,
  USER_LOGOUT_REQUEST,
} from "./constants/loginConstants";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_STARTED:
      return { isLoading: true };
    case LOGIN_REQUEST_SUCCESS:
      return { isLoading: false, isLogin: true, error: false };
    case LOGIN_REQUEST_FAILED:
      return { isLoading: false, error: action.payload };
    case NEW_LOGIN_ATTEMPT:
      return { isLoading: false, error: false };
    case USER_LOGOUT_REQUEST:
      return { isLogin: false };
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST_STARTED:
      return { isLoading: true };
    case REGISTER_REQUEST_SUCCESS:
      return { isLoading: false, registerError: false };
    case REGISTER_REQUEST_FAILED:
      return { isLoading: false, registerError: action.payload };
    case NEW_REGISTER_ATTEMPT:
      return { isLoading: false, registerError: false };
    default:
      return state;
  }
};
