import {
  GET_SHIPPING_ADDRESS_FAILED,
  GET_SHIPPING_ADDRESS_SUCCESS,
  GET_SHIPPING_ADDRESS_START,
  CREATE_SHIPPING_ADDRESS_FAILED,
  CREATE_SHIPPING_ADDRESS_SUCCESS,
  CREATE_SHIPPING_ADDRESS_START,
  UPDATE_SHIPPING_ADDRESS_STARTED,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_FAILED,
  UPDATE_SHIPPING_POST_SUCCESS,
} from "./constants/shippingConstant";

export const getShippingAddressReducer = (
  state = { isLoading: true },
  { type, payload }
) => {
  switch (type) {
    case GET_SHIPPING_ADDRESS_START:
      return { isLoading: true };
    case GET_SHIPPING_ADDRESS_SUCCESS:
      return { isLoading: false, shipping: payload };
    case GET_SHIPPING_ADDRESS_FAILED:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};

///////////////////////////////////////////////////////////////////////////////////
export const createShippingAddressReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_SHIPPING_ADDRESS_START:
      return { isLoading: true };
    case CREATE_SHIPPING_ADDRESS_SUCCESS:
      return { isLoading: false, success: true };
    case CREATE_SHIPPING_ADDRESS_FAILED:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};

///////////////////////////////////////////////////////////////////////////////////
export const updateShippingAddressReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_SHIPPING_ADDRESS_STARTED:
      return { isLoading: true };
    case UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return { isLoading: false, success: true };
    case UPDATE_SHIPPING_ADDRESS_FAILED:
      return { isLoading: false, error: payload };
    case UPDATE_SHIPPING_POST_SUCCESS:
      return { ...state, success: false };
    default:
      return state;
  }
};
