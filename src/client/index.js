"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var _App_1 = __importDefault(require("./pages/_App"));
require("./css/app.css");
require("./css/button.css");
require("./css/panel.css");
require("./css/textInput.css");
require("./css/header.css");
require("./css/flyoutMenu.css");
require("./css/timetable.css");
require("core-js/es/map");
require("core-js/es/set");
require("raf/polyfill");
react_dom_1["default"].render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(_App_1["default"], null)), document.getElementById("root"));
