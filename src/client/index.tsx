import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/_App";
import "./css/app.css";
import "./css/button.css";
import "./css/panel.css";
import "./css/textInput.css";
import "./css/header.css";
import "./css/flyoutMenu.css";
import "./css/timetable.css";

import "core-js/es/map";
import "core-js/es/set";
import "raf/polyfill";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
