"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var header_1 = __importDefault(require("./header"));
var event_1 = require("../event");
var Login_1 = __importDefault(require("../pages/Login"));
var Account_1 = __importDefault(require("../pages/Account"));
var Register_1 = __importDefault(require("../pages/Register"));
var MailConfirm_1 = __importDefault(require("../pages/MailConfirm"));
var TimeTable_1 = __importDefault(require("../pages/TimeTable"));
var RoomView_1 = __importDefault(require("../pages/RoomView"));
var ScheduleView_1 = __importDefault(require("../pages/ScheduleView"));
function App() {
    var initialUser = document.cookie
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    var _a = react_1.useState(initialUser), user = _a[0], setUser = _a[1];
    react_1.useEffect(function () {
        window.addEventListener(event_1.Event.USERINFO_UPDATE, function (e) {
            setUser(__assign(__assign({}, user), JSON.parse(e.detail)));
        });
        window.addEventListener(event_1.Event.LOGIN, function (e) {
            var data = e.detail;
            var token = data ? data.token : "";
            var userInfo = data ? data.userInfo : "";
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            document.cookie =
                data == null
                    ? "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
                    : "token=" + token + ";path=/;";
            setUser(userInfo);
        }, false);
    }, []);
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement("div", { id: "app", className: "App" },
            react_1["default"].createElement(header_1["default"], { user: user }),
            react_1["default"].createElement(react_router_dom_1.Switch, null,
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/" }, user ? react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/timetable" }) : react_1["default"].createElement(Login_1["default"], null)),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/login", component: Login_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/register", component: Register_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/confirm/:token" },
                    react_1["default"].createElement(MailConfirm_1["default"], null)),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/account" },
                    react_1["default"].createElement(Account_1["default"], { user: user })),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/schedules" },
                    react_1["default"].createElement(ScheduleView_1["default"], { user: user })),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/timetable/:date" },
                    react_1["default"].createElement(TimeTable_1["default"], { user: user })),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/timetable" },
                    react_1["default"].createElement(TimeTable_1["default"], { user: user })),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/rooms" },
                    react_1["default"].createElement(RoomView_1["default"], { user: user }))))));
}
exports["default"] = App;
