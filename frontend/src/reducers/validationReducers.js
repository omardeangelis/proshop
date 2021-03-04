import {
  SEND_ACTIVATION_TOKEN_FAILED,
  SEND_ACTIVATION_TOKEN_SUCCESS,
  SEND_ACTIVATION_TOKEN_STARTED,
  PROFILE_ACTIVATION_STARTED,
  PROFILE_ACTIVATION_SUCCESS,
  PROFILE_ACTIVATION_FAILED,
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
