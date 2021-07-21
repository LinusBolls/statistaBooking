"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var event_1 = require("../event");
var CustomLinks_1 = require("../components/CustomLinks");
var react_router_dom_1 = require("react-router-dom");
function AccountPage(_a) {
    var user = _a.user;
    if (!user)
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", component: CustomLinks_1.LinkButtonText }, "Log in"),
            "to view account info"));
    var content = Object.entries(user).map(function (entry) {
        var key = entry[0], value = entry[1];
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", null, key),
            react_1["default"].createElement("div", null, value)));
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, user.firstName + " " + user.lastName),
        react_1["default"].createElement("div", null, content),
        react_1["default"].createElement("button", { className: "button long invis text", onClick: event_1.logout }, "Log out")));
}
exports["default"] = AccountPage;
