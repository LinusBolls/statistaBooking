"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var App_1 = __importDefault(require("./components/App"));
require("./components/app.css");
require("./components/button.css");
require("./components/panel.css");
require("./components/textInput.css");
require("./components/header.css");
require("./components/flyoutMenu.css");
require("./components/timetable.css");
require("core-js/es/map");
require("core-js/es/set");
require("raf/polyfill");
react_dom_1["default"].render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(App_1["default"], null)), document.getElementById("root"));
