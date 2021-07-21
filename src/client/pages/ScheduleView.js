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
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var sharedProjectConfig_1 = require("../../shared/sharedProjectConfig");
var react_router_dom_1 = require("react-router-dom");
var CustomLinks_1 = require("../components/CustomLinks");
function ScheduleView(_a) {
    var user = _a.user;
    if (!user)
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", component: CustomLinks_1.LinkButtonText }, "Log in"),
            "to view your schedules"));
    var _b = react_1.useState(null), schedules = _b[0], setSchedules = _b[1];
    react_1.useEffect(function () {
        axios_1["default"]
            .post(sharedProjectConfig_1.domain + "/api/booked/schedules", {
            token: document.cookie.replace("token=", "")
        }, {})
            .then(function (res) { return setSchedules(res.data.data); });
    }, []);
    return (react_1["default"].createElement("div", { className: "panel" },
        " ",
        react_1["default"].createElement("div", { className: "header panel__header" }, "Your Schedules"),
        schedules ? schedules.map(mapSchedule) : "Fetching..."));
}
exports["default"] = ScheduleView;
var mapSchedule = function (_a) {
    var date = _a.date, room = _a.room, slot = _a.slot;
    return (react_1["default"].createElement("p", { className: moment_1["default"](date).isBefore(moment_1["default"]().add(date.split(":")[0], "hours"))
            ? "scheduleCard--expired"
            : "" }, room + " (" + moment_1["default"](date).format(sharedProjectConfig_1.dateFormat) + " at " + slot + ")"));
};
