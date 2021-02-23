import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  TOGGLE_CART_ITEM_QTY,
} from "./constants/cartConstants";
export const cartReducer = (
  state = {
    cartItems: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const item = { ...action.payload };
      let exist = state.cartItems.find((product) => product._id === item._id);

      //Controllo che id elemento non sia gia presente
      if (!exist) {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload }],
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product._id === item._id ? item : product
          ),
        };
      }
    //Rimuove elemento non desiderato
    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product._id !== action.payload
        ),
      };
    //Getisce aumento e diminuzione elementi nel carrello
    case TOGGLE_CART_ITEM_QTY:
      const newCartItems = state.cartItems.map((product) => {
        if (product._id === action.payload._id) {
          if (action.payload.type === "add") {
            return {
              ...product,
              qty:
                product.qty + 1 < product.countInStock
                  ? product.qty + 1
                  : product.qty,
            };
          }
          return {
            ...product,
            qty: product.qty - 1 > 0 ? product.qty - 1 : product.qty,
          };
        }
        return product;
      });
      return { ...state, cartItems: newCartItems };
    default:
      return state;
  }
};
