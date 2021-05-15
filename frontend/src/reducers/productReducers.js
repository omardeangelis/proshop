import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  CLEAN_PRODUCT_LIST,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_RESET,
} from "./constants/productListConst";

export const productListReducer = (
  state = { products: [], isLoading: true, error: false },
  action
) => {
  switch (action.type) {
    //Inizio della richiesta al server
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true, ...state };
    //Richiesta andata a buon fine
    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload };
    //Richiesta fallita
    case PRODUCT_LIST_FAIL:
      return { isLoading: false, error: action.payload };
    //pulisce la lista dei prodotti
    case CLEAN_PRODUCT_LIST:
      return { isLoading: true, products: [], error: false };
    default:
      return state;
  }
};

export const updateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PRODUCT_START:
      return { isLoading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { isLoading: false, success: true };
    case UPDATE_PRODUCT_FAILED:
      return { isLoading: false, error: payload };
    case UPDATE_PRODUCT_RESET:
      return { ...state, success: false, error: false };
    default:
      return state;
  }
};
