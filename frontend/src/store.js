import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";
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
} from "./reducers/validationReducers";

const reducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
  profile: getProfileReducer,
  updateProfile: updateProfileReducer,
  updatePassword: updtateUserPasswordReducer,
  sendUserValidationToken: sendActivationTokenReducer,
  validateProfileActivation: profileActivationReducer,
  sendPasswordToken: sendPasswordTokenReducer,
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

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  login: {
    isLogin: userIsLogged,
    isAdmin: userIsAdmin,
  },
  profile: { isActive: userIsActive },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
