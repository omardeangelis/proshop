import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  CLEAN_PRODUCT_LIST,
} from "../constants/productListConst";
import axios from "axios";

export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const {
      data: { data },
    } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Pulisce i prodotti fetchati una volta che cambiamo pagina
export const cleanProductList = () => async (dispatch) => {
  dispatch({ type: CLEAN_PRODUCT_LIST });
};
