"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var CustomLinks_1 = require("./CustomLinks");
var moment_1 = __importDefault(require("moment"));
function MenuButton() {
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("button", { id: "menuButton", className: "button invis square icon menuButton" +
                (open ? " menuButton--open" : ""), onClick: function () { return setOpen(!open); } },
            react_1["default"].createElement("span", null),
            react_1["default"].createElement("span", null),
            react_1["default"].createElement("span", null)),
        react_1["default"].createElement("div", { className: "flyoutMenu__shadow" + (open ? " flyoutMenu__shadow--open" : ""), onClick: function () { return setOpen(!open); } }),
        react_1["default"].createElement("div", { className: "flyoutMenu" + (open ? " flyoutMenu--open" : " flyoutMenu--closed") },
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/timetable", component: CustomLinks_1.LinkButtonText },
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("i", { className: "far fa-calendar-alt" }),
                    " Timetable")),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/schedules", component: CustomLinks_1.LinkButtonText },
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("i", { className: "fas fa-desktop" }),
                    " Your Schedule")),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/rooms", component: CustomLinks_1.LinkButtonText },
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("i", { className: "fas fa-desktop" }),
                    " Rooms")),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/users", component: CustomLinks_1.LinkButtonText },
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("i", { className: "fas fa-users" }),
                    " Users")),
            react_1["default"].createElement("p", { className: "copyrightNotice" },
                "\u00A9 Linus Bolls ",
                moment_1["default"]().format("YYYY")))));
}
exports["default"] = MenuButton;
