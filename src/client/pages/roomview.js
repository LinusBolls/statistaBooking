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
var sharedProjectConfig_1 = require("../../shared/sharedProjectConfig");
var input_1 = __importDefault(require("../components/input"));
var react_router_dom_1 = require("react-router-dom");
var CustomLinks_1 = require("../components/CustomLinks");
function RoomView(_a) {
    var user = _a.user;
    if (!user)
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", component: CustomLinks_1.LinkButtonText }, "Log in"),
            "to view available rooms"));
    var _b = react_1.useState(null), rooms = _b[0], setRooms = _b[1];
    react_1.useEffect(function () {
        axios_1["default"]
            .post(sharedProjectConfig_1.domain + "/api/view/room", {
            token: document.cookie.replace("token=", "")
        }, {})
            .then(function (res) { return setRooms(res.data.data); })["catch"](function (e) { return alert(e); });
    }, []);
    return (react_1["default"].createElement("div", { className: "panel" },
        " ",
        react_1["default"].createElement("div", { className: "header panel__header" }, "Rooms"),
        rooms ? rooms.map(mapRoom) : "Fetching...",
        user.isAdmin ? react_1["default"].createElement(CreateRoomPanel, null) : ""));
}
exports["default"] = RoomView;
var mapRoom = function (_a) {
    var title = _a.title, floor = _a.floor, workstations = _a.workstations, description = _a.description;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h3", null, title + " - Floor " + floor),
        description ? react_1["default"].createElement("p", null, description) : "",
        react_1["default"].createElement("p", null, workstations + " desks")));
};
var CreateRoomPanel = function () { return (react_1["default"].createElement(react_1["default"].Fragment, null,
    react_1["default"].createElement(input_1["default"], { label: "Title" }),
    react_1["default"].createElement(input_1["default"], { label: "Floor" }),
    react_1["default"].createElement(input_1["default"], { label: "Description" }),
    react_1["default"].createElement(input_1["default"], { label: "Workstations" }),
    react_1["default"].createElement("button", { className: "button long cta0 text", onClick: createRoom }, "Create"))); };
var createRoom = function () {
    var title = document.getElementById("Title");
    var floor = document.getElementById("Floor");
    var description = document.getElementById("Description");
    var workstations = document.getElementById("Workstations");
    axios_1["default"]
        .post(sharedProjectConfig_1.domain + "/api/create/room", {
        token: document.cookie.replace("token=", ""),
        data: {
            floor: floor,
            workstations: workstations,
            description: description,
            title: title
        }
    }, {})
        .then(function (res) { return alert(JSON.stringify(res)); })["catch"](function (e) { return alert(e); });
};
