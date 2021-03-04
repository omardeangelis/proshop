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

import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
