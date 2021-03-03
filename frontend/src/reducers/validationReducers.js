import {
  SEND_ACTIVATION_TOKEN_FAILED,
  SEND_ACTIVATION_TOKEN_SUCCESS,
  SEND_ACTIVATION_TOKEN_STARTED,
} from "./constants/validationContants";

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
      return { isLoading: true, error: payload };
    default:
      return state;
  }
};
