import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Product Reducer
import {
  deleteProductReducer,
  productListReducer,
  updateReducer,
  createProductReducer,
} from "./reducers/productReducers";
//Cart Reducer
import { cartReducer } from "./reducers/cartReducer";

//User login, logout, updateinfo e update password
import {
  loginReducer,
  registerReducer,
  getProfileReducer,
  updateProfileReducer,
  updtateUserPasswordReducer,
} from "./reducers/loginReducer";

//User activation e password Reset
import {
  sendActivationTokenReducer,
  profileActivationReducer,
  sendPasswordTokenReducer,
  resetPasswordReducer,
} from "./reducers/validationReducers";

//User Shipping Reducer
import {
  getShippingAddressReducer,
  createShippingAddressReducer,
  updateShippingAddressReducer,
} from "./reducers/shippingReducer";

//Order Reducer
import {
  createOrderReducer,
  getUserOrderReducer,
} from "./reducers/orderReducer";

//Admin Reducer
import {
  getUserListReducer,
  deleteUserReducer,
  updateUserByAdminReducer,
} from "./reducers/adminReducer";

const reducer = combineReducers({
  //Prodotti
  productList: productListReducer,
  updateProduct: updateReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
  //Cart
  cart: cartReducer,
  //User CRUD
  login: loginReducer,
  register: registerReducer,
  profile: getProfileReducer,
  updateProfile: updateProfileReducer,
  updatePassword: updtateUserPasswordReducer,
  //Shipping CRUD
  getShippingAddress: getShippingAddressReducer,
  newShippingAddress: createShippingAddressReducer,
  updateShippingAddress: updateShippingAddressReducer,
  //User Validation
  sendUserValidationToken: sendActivationTokenReducer,
  validateProfileActivation: profileActivationReducer,
  sendPasswordToken: sendPasswordTokenReducer,
  resetPassword: resetPasswordReducer,
  //Order CRUD
  order: createOrderReducer,
  orderList: getUserOrderReducer,
  // Admin Func
  getUserList: getUserListReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserByAdminReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userIsLogged = localStorage.getItem("isLogin")
  ? JSON.parse(localStorage.getItem("isLogin"))
  : false;

const userIsAdmin = localStorage.getItem("isAdmin")
  ? JSON.parse(localStorage.getItem("isAdmin"))
  : false;

const userIsActive = localStorage.getItem("isActive")
  ? JSON.parse(localStorage.getItem("isActive"))
  : false;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  login: {
    isLogin: userIsLogged,
    isAdmin: userIsAdmin,
  },
  profile: { isActive: userIsActive },
  getShippingAddress: { shipping: shippingAddressFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
