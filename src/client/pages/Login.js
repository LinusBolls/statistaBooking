"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Input_1 = __importDefault(require("../components/Input"));
var validate_1 = require("../../shared/validate");
var CustomLinks_1 = require("../components/CustomLinks");
var axios_1 = __importDefault(require("axios"));
var sharedProjectConfig_1 = require("../../shared/sharedProjectConfig");
var event_1 = require("../event");
function LoginPage(props) {
    var login = function () {
        var emailField = document.getElementById("Email");
        var passwordField = document.getElementById("Password");
        var output = document.getElementById("output");
        axios_1["default"]
            .post(sharedProjectConfig_1.domain + "/api/login", {
            data: {
                email: emailField.value,
                password: passwordField.value
            }
        }, {})
            .then(function (res) {
            if (res.data.data)
                event_1.fireLoginEvent(res.data.data);
            else {
                if (typeof res.data.reason === "string") {
                    output.innerHTML = res.data.reason;
                    return;
                }
                output.innerHTML = res.data.reason.reduce(function (str, error) { return str + ("<p>" + error + "</p>"); }, "");
            }
        })["catch"](function (e) { return (output.innerHTML = e); });
    };
    return (react_1["default"].createElement("div", { className: "panel" },
        react_1["default"].createElement("div", { className: "header panel__header" },
            "Log in",
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/register", component: CustomLinks_1.LinkButtonText }, "Not a user yet?")),
        react_1["default"].createElement("p", { id: "output" }),
        react_1["default"].createElement(Input_1["default"], { label: "Email", inputType: validate_1.input.user.email }),
        react_1["default"].createElement(Input_1["default"], { label: "Password", inputType: validate_1.input.user.password }),
        react_1["default"].createElement("button", { className: "button panel__button long cta0", onClick: login },
            react_1["default"].createElement("i", { className: "fa fa-paper-plane", "aria-hidden": "true" }))));
}
exports["default"] = LoginPage;
