import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  CLEAN_PRODUCT_LIST,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_RESET,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED,
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

export const deleteProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_PRODUCT_START:
      return { isLoading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { isLoading: false, success: true };
    case DELETE_PRODUCT_FAILED:
      return { isLoading: false, error: payload };
    case DELETE_PRODUCT_RESET:
      return { ...state, success: false, error: false };
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_PRODUCT_START:
      return { isLoading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { isLoading: false, success: true, product_id: payload };
    case CREATE_PRODUCT_FAILED:
      return { isLoading: false, error: payload };
    default:
      return state;
  }
};
