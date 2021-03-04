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
  PROFILE_REQUEST_FAILED,
  PROFILE_REQUEST_STARTED,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_RESET,
  UPDATE_PROFILE_REQUEST_FAILED,
  UPDATE_PROFILE_REQUEST_STARTED,
  UPDATE_PROFILE_REQUEST_SUCCESS,
  UPDATE_PASSWORD_REQUEST_STARTED,
  UPDATE_PASSWORD_REQUEST_SUCCESS,
  UPDATE_PASSWORD_REQUEST_FAILED,
  UPDATE_PASSWORD_POST_SUCCESS,
  UPDATE_PROFILE_POST_SUCCESS,
} from "./constants/loginConstants";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_STARTED:
      return { isLoading: true };
    case LOGIN_REQUEST_SUCCESS:
      return {
        isLoading: false,
        isLogin: true,
        isAdmin: action.payload,
        error: false,
      };
    case LOGIN_REQUEST_FAILED:
      return { isLoading: false, error: action.payload };
    case NEW_LOGIN_ATTEMPT:
      return { isLoading: false, error: false };
    case USER_LOGOUT_REQUEST:
      return { isLogin: false, isAdmin: false };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////////////////////

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST_STARTED:
      return { isLoading: true };
    case REGISTER_REQUEST_SUCCESS:
      return { isLoading: false, success: true };
    case REGISTER_REQUEST_FAILED:
      return { isLoading: false, registerError: action.payload };
    case NEW_REGISTER_ATTEMPT:
      return { isLoading: false, registerError: false };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////////////////////

export const getProfileReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case PROFILE_REQUEST_STARTED:
      return { ...state, isLoading: true };
    case PROFILE_REQUEST_SUCCESS: {
      return { isLoading: false, user: { ...payload }, error: false };
    }
    case PROFILE_REQUEST_FAILED:
      return { isLoading: false, error: payload };
    case PROFILE_REQUEST_RESET:
      return { isLoading: false, error: false, user: {} };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////////////////////

export const updateProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PROFILE_REQUEST_STARTED:
      return { ...state, isLoading: true, error: false };
    case UPDATE_PROFILE_REQUEST_SUCCESS:
      return {
        isLoading: false,
        user: { ...payload },
        success: true,
      };
    case UPDATE_PROFILE_REQUEST_FAILED: {
      return { isLoading: false, error: payload };
    }
    case UPDATE_PROFILE_POST_SUCCESS:
      return { ...state, success: false };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////////////////////

export const updtateUserPasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PASSWORD_REQUEST_STARTED:
      return { isLoading: true };
    case UPDATE_PASSWORD_REQUEST_SUCCESS:
      return { isLoading: false, success: true };
    case UPDATE_PASSWORD_REQUEST_FAILED:
      return {
        isLoading: false,
        error: payload,
      };
    case UPDATE_PASSWORD_POST_SUCCESS:
      return { ...state, success: false };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////////////////////
