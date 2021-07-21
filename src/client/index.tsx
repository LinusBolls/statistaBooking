import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./components/app.css";
import "./components/button.css";
import "./components/panel.css";
import "./components/textInput.css";
import "./components/header.css";
import "./components/flyoutMenu.css";
import "./components/timetable.css";

import "core-js/es/map";
import "core-js/es/set";
import "raf/polyfill";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
