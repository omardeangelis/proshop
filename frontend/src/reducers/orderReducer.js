import {
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
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
