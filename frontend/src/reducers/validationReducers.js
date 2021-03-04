import {
  SEND_ACTIVATION_TOKEN_FAILED,
  SEND_ACTIVATION_TOKEN_SUCCESS,
  SEND_ACTIVATION_TOKEN_STARTED,
  PROFILE_ACTIVATION_STARTED,
  PROFILE_ACTIVATION_SUCCESS,
  PROFILE_ACTIVATION_FAILED,
  SEND_RESET_PASSWORD_TOKEN_STARTED,
  SEND_RESET_PASSWORD_TOKEN_SUCCESS,
  SEND_RESET_PASSWORD_TOKEN_FAILED,
  RESET_SEND_PASSWORD_TOKEN,
  PASSWORD_RESET_STARTED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  RESET_PASSWORD_STATE,
} from "./constants/validationContants";

// Gestisce gli state per l'invio del token per attivazione profilo
export const sendActivationTokenReducer = (
  state = { isLoading: true },
  { type, payload }
) => {
  switch (type) {
    case SEND_ACTIVATION_TOKEN_STARTED:
      return { isLoading: true };
    case SEND_ACTIVATION_TOKEN_SUCCESS:
      return { isLoading: false, success: true };
    case SEND_ACTIVATION_TOKEN_FAILED:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////

// Gestisce gli state per'attivazione del profilo
export const profileActivationReducer = (
  state = { isLoading: true },
  { type, payload }
) => {
  switch (type) {
    case PROFILE_ACTIVATION_STARTED:
      return { isLoading: true };
    case PROFILE_ACTIVATION_SUCCESS:
      return { isLoading: false, success: true };
    case PROFILE_ACTIVATION_FAILED:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////

//gestisce state dell'invio della mail con reset della password
export const sendPasswordTokenReducer = (
  state = { isLoading: false, success: false },
  { type, payload }
) => {
  switch (type) {
    case SEND_RESET_PASSWORD_TOKEN_STARTED:
      return { isLoading: true };
    case SEND_RESET_PASSWORD_TOKEN_SUCCESS:
      return { isLoading: false, success: true };
    case SEND_RESET_PASSWORD_TOKEN_FAILED:
      return { isLoading: false, error: payload };
    case RESET_SEND_PASSWORD_TOKEN:
      return { ...state, error: false, success: false };
    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////

// Gestisce gli state per il resetdellapassword
export const resetPasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PASSWORD_RESET_STARTED:
      return { isLoading: true };
    case PASSWORD_RESET_SUCCESS:
      return { isLoading: false, success: true };
    case PASSWORD_RESET_FAILED:
      return { isLoading: false, error: payload };
    case RESET_PASSWORD_STATE:
      return { ...state, error: false, success: false };
    default:
      return state;
  }
};
