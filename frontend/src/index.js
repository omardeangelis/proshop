import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ThemeWrapper from "./theme";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
