import {
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  GET_MY_ORDERS_START,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAILED,
} from "./constants/orderConstants";

//Gestisce State Creazione Ordine
export const createOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PLACE_ORDER_START:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, session_id: payload };
    case PLACE_ORDER_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const getUserOrderReducer = (
  state = { isLoading: true },
  { type, payload }
) => {
  switch (type) {
    case GET_MY_ORDERS_START:
      return { isLoading: true };
    case GET_MY_ORDERS_SUCCESS:
      return { isLoading: false, orderList: payload };
    case GET_MY_ORDERS_FAILED:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};
