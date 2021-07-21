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
var event_1 = require("../event");
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
function Header(props) {
    return (react_1["default"].createElement("div", { className: "header header--pageTop" },
        react_1["default"].createElement(MenuButton, null),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/home", component: CustomLinks_1.LinkStatistaLogo }),
        react_1["default"].createElement(AccountInfo, { user: props.user })));
}
function AccountInfo(_a) {
    var user = _a.user;
    var _b = event_1.newBreakpointListener(), initialBreakpoint = _b[0], breakpointListener = _b[1];
    var _c = react_1.useState(initialBreakpoint), viewport = _c[0], setViewport = _c[1];
    breakpointListener(function (width) { return setViewport(width); });
    var desktopView = user ? (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/account", component: CustomLinks_1.LinkButtonText }, user.firstName + " " + user.lastName),
        react_1["default"].createElement("button", { className: "button long invis icon", onClick: event_1.logout },
            react_1["default"].createElement("i", { className: "fas fa-sign-out-alt" })),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/timetable", component: CustomLinks_1.LinkButtonIcon },
            react_1["default"].createElement("i", { className: "far fa-calendar-alt" })))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/register", component: CustomLinks_1.LinkButtonText }, "Register")));
    return (react_1["default"].createElement("div", { className: "accountInfo", style: {
            display: "flex",
            flexDirection: "row-reverse"
        } },
        react_1["default"].createElement(react_router_dom_1.Link, { to: user ? "/account" : "/login", component: CustomLinks_1.LinkButtonIcon }, user ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("i", { className: "far fa-user-circle" }))) : (react_1["default"].createElement("i", { className: "fas fa-sign-in-alt" }))),
        viewport >= 600 ? desktopView : ""));
}
exports["default"] = Header;
