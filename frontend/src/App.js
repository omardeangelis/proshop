import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import LogoutScreen from "./screen/LogoutScreen";
import UserProfileScreen from "./screen/UserProfileScreen";
import SendActiveScreen from "./screen/auth/SendActiveScreen";
import ForgotPasswordScreen from "./screen/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./screen/auth/resetPasswordScreen";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShippingScreen from "./screen/ShippingScreen";
import PaymentMethodScreen from "./screen/PaymentMethod";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import SingleOrderScreen from "./screen/SingleOrderScreen";
import AdminScreen from "./screen/admin/AdminScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/cart/:id?" exact component={CartScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/logout" exact component={LogoutScreen} />
            <Route path="/profile" exact component={UserProfileScreen} />
            <Route
              path="/activeuser/:token?"
              exact
              component={SendActiveScreen}
            />
            <Route
              path="/forgotpassword"
              exact
              component={ForgotPasswordScreen}
            />
            <Route
              path="/resetpassword/:token"
              exact
              component={ResetPasswordScreen}
            />
            <Route path="/shipping" exact component={ShippingScreen} />
            <Route
              path="/paymentmethod"
              exact
              component={PaymentMethodScreen}
            />
            <Route path="/placeorder" exact component={PlaceOrderScreen} />
            <Route path="/order/:id" exact component={SingleOrderScreen} />
            <Route path="/admin" component={AdminScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
