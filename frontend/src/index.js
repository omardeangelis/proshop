import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ThemeWrapper from "./theme";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </Provider>,
  document.getElementById("root")
);
