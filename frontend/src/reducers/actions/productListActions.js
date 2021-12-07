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
  CREATE_PRODUCT_FAILED,
  CREATE_PRODUCT_SUCCESS,
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

//Modifica un prodotto
export const updateProductById = (_id, data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: UPDATE_PRODUCT_START });
  try {
    await axios.put(
      `/api/products/${_id}`,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        countInStock: data.countInStock,
        category: data.category,
        brand: data.brand,
        isDeleted: JSON.stringify(data.isDeleted),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetUpdateProductState = () => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_RESET });
};

export const setProductAsDeleted = (_id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_START });
  try {
    await axios.delete(`/api/products/${_id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetDeleteProductState = () => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_RESET });
};

export const createNewProduct = () => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_START });
  try {
    const response = await axios.post(
      "/api/products",
      {},
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data.data._id });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
