import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  CLEAN_PRODUCT_LIST,
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
