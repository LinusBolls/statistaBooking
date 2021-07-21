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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var react_router_dom_1 = require("react-router-dom");
var CustomLinks_1 = require("../components/CustomLinks");
var axios_1 = __importDefault(require("axios"));
var sharedProjectConfig_1 = require("../../shared/sharedProjectConfig");
var event_1 = require("../event");
var weekStartAndEnd = function (date, formatOption) {
    if (formatOption === void 0) { formatOption = "l"; }
    return moment_1["default"](date, sharedProjectConfig_1.dateFormat).startOf("week").format(formatOption) + "\n   - \n   " + moment_1["default"](date, sharedProjectConfig_1.dateFormat).endOf("week").format(formatOption);
};
var formatOptions = ["DD/MM"];
var fetchWeekData = function (date) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]
                    .post(sharedProjectConfig_1.domain + "/api/view/schedule", {
                    token: document.cookie.replace("token=", ""),
                    data: {
                        week: date
                    }
                }, {})
                    .then(function (res) { return res.data.data; })["catch"](function (e) { return alert(e); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var fetchRooms = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]
                    .post(sharedProjectConfig_1.domain + "/api/view/room", {
                    token: document.cookie.replace("token=", "")
                }, {})
                    .then(function (res) { return res.data.data; })["catch"](function (e) { return alert(e); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var redirect = function (mom) {
    return window.location.replace(sharedProjectConfig_1.domain + "/timetable/" + mom.format(sharedProjectConfig_1.dateFormat));
};
function TimeTable(_a) {
    var user = _a.user;
    var date = react_router_dom_1.useParams().date;
    if (!moment_1["default"](date, sharedProjectConfig_1.dateFormat, true).isValid())
        redirect(moment_1["default"]());
    var _b = react_1.useState(null), targetMoment = _b[0], setTargetMoment = _b[1];
    var _c = react_1.useState(null), weekData = _c[0], setWeekData = _c[1];
    var _d = react_1.useState(0), formatOption = _d[0], setFormatOption = _d[1];
    var _e = react_1.useState(null), rooms = _e[0], setRooms = _e[1];
    react_1.useEffect(function () {
        fetchWeekData(date).then(function (res) { return setWeekData(res); });
        fetchRooms().then(function (res) { return setRooms(res); });
        window.addEventListener(event_1.Event.BOOKING_VIEW, function (e) {
            return setTargetMoment(e.detail);
        });
        window.addEventListener(event_1.Event.USERINFO_UPDATE, function (e) {
            return fetchWeekData(date).then(function (res) { return setWeekData(res); });
        });
    }, []);
    if (!user)
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", component: CustomLinks_1.LinkButtonText }, "Log in"),
            "to view this weeks schedule"));
    var newWeek = function (weekAmount) {
        return weekAmount === 0
            ? redirect(moment_1["default"]())
            : redirect(moment_1["default"](date, sharedProjectConfig_1.dateFormat).add(weekAmount, "weeks"));
    };
    var isCurrentWeek = moment_1["default"](date, sharedProjectConfig_1.dateFormat).startOf("week").format(sharedProjectConfig_1.dateFormat) ===
        moment_1["default"]().startOf("week").format(sharedProjectConfig_1.dateFormat);
    var incrementFormatOption = function () {
        setFormatOption(formatOption + 1);
        if (formatOption > formatOptions.length - 2)
            setFormatOption(0);
    };
    return (react_1["default"].createElement("div", { className: "panel" },
        react_1["default"].createElement("div", { className: "header panel__header timetable__header" +
                (isCurrentWeek ? " timetable__header--currentWeek" : "") },
            react_1["default"].createElement("button", { className: "button invis square icon", onClick: function () { return newWeek(-1); } }, "<"),
            react_1["default"].createElement("p", { onClick: incrementFormatOption, style: { margin: "auto" } }, weekStartAndEnd(date, formatOptions[formatOption])),
            react_1["default"].createElement("button", { className: "button invis long text" +
                    (isCurrentWeek ? " timetable__todayButton--isCurrentWeek" : ""), onClick: function () { return newWeek(0); } }, "Today"),
            react_1["default"].createElement("button", { className: "button invis square icon", onClick: function () { return newWeek(1); } }, ">")),
        react_1["default"].createElement("table", { className: "timetable" },
            react_1["default"].createElement("tbody", null, weekData ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("tr", { className: "timetable__column" },
                    react_1["default"].createElement("th", { className: "timetable__yearDisplay" }, moment_1["default"](date, sharedProjectConfig_1.dateFormat).format("YYYY")),
                    react_1["default"].createElement("th", null, "6:00 - 9:00"),
                    react_1["default"].createElement("th", null, "9:00 - 12:00"),
                    react_1["default"].createElement("th", null, "12:00 - 15:00"),
                    react_1["default"].createElement("th", null, "15:00 - 18:00"),
                    react_1["default"].createElement("th", null, "18:00 - 21:00")),
                Object.values(weekData).map(function (data, day) {
                    return columnMap(data, day, isCurrentWeek, date, targetMoment);
                }))) : (react_1["default"].createElement("tr", null,
                react_1["default"].createElement("th", null, "Fetching..."))))),
        targetMoment ? (react_1["default"].createElement(BookingView, { targetMoment: targetMoment, user: user, rooms: rooms })) : ("")));
}
exports["default"] = TimeTable;
var columnMap = function (day, weekDay, isCurrentWeek, date, targetMoment) { return (react_1["default"].createElement("tr", { key: weekDay, className: "timetable__column" +
        (isCurrentWeek && moment_1["default"]().subtract(1, "day").day() === weekDay
            ? " timetable__column--today"
            : "") },
    react_1["default"].createElement("th", null, sharedProjectConfig_1.weekDays[weekDay]),
    Object.entries(day).map(function (slot) {
        return timeslotMap(slot, date, weekDay, targetMoment);
    }))); };
var timeslotMap = function (_a, date, weekDay, targetMoment) {
    var hour = _a[0], data = _a[1];
    var slotMoment = moment_1["default"](date, sharedProjectConfig_1.dateFormat)
        .startOf("week")
        .add(weekDay, "days")
        .add(hour.split(":")[0], "hours");
    var isBookable = slotMoment.isAfter(moment_1["default"]()) &&
        slotMoment.isBefore(moment_1["default"]().add(sharedProjectConfig_1.maxAdvancedBookingDays, "days")) &&
        data.desks > 0;
    return (react_1["default"].createElement("td", { key: weekDay + hour, onClick: function () {
            if (isBookable)
                event_1.fireBookingViewEvent(slotMoment.toISOString());
        }, className: "timetable__timeslot" +
            (isBookable ? " timetable__timeslot--bookable" : "") +
            (targetMoment === slotMoment.toISOString()
                ? " timetable__timeslot--selected"
                : "") +
            (data.isBookedByUser ? " timetable__timeslot--booked" : "") }, data.desks));
};
function BookingView(_a) {
    var targetMoment = _a.targetMoment, user = _a.user, rooms = _a.rooms;
    var isBookingLimitReached = user.bookingLimit === false ? false : user.booked >= user.bookingLimit;
    function book() {
        var Room = document.getElementById("Room");
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
                : alert("something went wrong");
        })["catch"](function (e) { return alert(e); });
    }
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
        react_1["default"].createElement("button", __assign({ className: "button long cta0", onClick: isBookingLimitReached ? function () { } : book }, (isBookingLimitReached ? { disabled: true } : {})), "Book")));
}
var BookingLimitDisplay = function (user) {
    return (react_1["default"].createElement("div", { className: "noselect" }, "Your Bookings: " + user.user.booked + " / ",
        user.user.bookingLimit === false ? (react_1["default"].createElement("i", { className: "fas fa-infinity" })) : (user.user.bookingLimit)));
};
