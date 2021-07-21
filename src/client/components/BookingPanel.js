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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var sharedProjectConfig_1 = require("../../shared/sharedProjectConfig");
var event_1 = require("../event");
function BookingPanel(_a) {
    var targetMoment = _a.targetMoment, user = _a.user, rooms = _a.rooms, displayResponse = _a.displayResponse;
    var isBookingLimitReached = user.bookingLimit === false ? false : user.booked >= user.bookingLimit;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "header panel__midPageHeader" }, moment_1["default"](targetMoment).format("DD/MM") +
            " " +
            moment_1["default"](targetMoment).format("H:00") +
            " - " +
            moment_1["default"](targetMoment).add(3, "hours").format("H:00")),
        react_1["default"].createElement(BookingLimitDisplay, { user: user }),
        react_1["default"].createElement("select", { id: "Room", className: "customSelect", name: "Room" }, rooms.map(function (_a) {
            var title = _a.title, floor = _a.floor, workstations = _a.workstations, description = _a.description;
            return (react_1["default"].createElement("option", { value: title }, title + " - Floor " + floor));
        })),
        react_1["default"].createElement("button", __assign({ className: "button long cta0", onClick: isBookingLimitReached
                ? function () { }
                : function () { return book(targetMoment, displayResponse); } }, (isBookingLimitReached ? { disabled: true } : {})), "Book")));
}
exports["default"] = BookingPanel;
var BookingLimitDisplay = function (user) {
    return (react_1["default"].createElement("div", { className: "noselect" }, "Your Bookings: " + user.user.booked + " / ",
        user.user.bookingLimit === false ? (react_1["default"].createElement("i", { className: "fas fa-infinity" })) : (user.user.bookingLimit)));
};
var book = function (targetMoment, displayResponse) {
    var Room = document.getElementById("Room");
    var output = document.getElementById("output");
    axios_1["default"]
        .post(sharedProjectConfig_1.domain + "/api/book/schedule", {
        token: document.cookie.replace("token=", ""),
        data: {
            room: Room.value,
            date: moment_1["default"](targetMoment).format(sharedProjectConfig_1.dateFormat),
            slot: moment_1["default"](targetMoment).format("H:00")
        }
    }, {})
        .then(function (res) {
        return res.data.success
            ? event_1.fireUserinfoUpdateEvent({
                bookingLimit: res.data.data.newBookingLimit,
                booked: res.data.data.booked
            })
            : displayResponse(res.data.reason);
    })["catch"](displayResponse);
};
