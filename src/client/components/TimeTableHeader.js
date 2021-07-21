"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var sharedProjectConfig_1 = require("../../shared/sharedProjectConfig");
var weekStartAndEnd = function (date, formatOption) {
    if (formatOption === void 0) { formatOption = "l"; }
    return moment_1["default"](date, sharedProjectConfig_1.dateFormat).startOf("week").format(formatOption) + "\n   - \n   " + moment_1["default"](date, sharedProjectConfig_1.dateFormat).endOf("week").format(formatOption);
};
function TimeTableHeader(_a) {
    var isCurrentWeek = _a.isCurrentWeek, newWeek = _a.newWeek, date = _a.date;
    return (react_1["default"].createElement("div", { className: "header panel__header timetable__header" +
            (isCurrentWeek ? " timetable__header--currentWeek" : "") },
        react_1["default"].createElement("button", { className: "button invis square icon", onClick: function () { return newWeek(-1); } }, "<"),
        react_1["default"].createElement("p", { style: { margin: "auto" } }, weekStartAndEnd(date, "DD/MM")),
        react_1["default"].createElement("button", { className: "button invis long text" +
                (isCurrentWeek ? " timetable__todayButton--isCurrentWeek" : ""), onClick: function () { return newWeek(0); } }, "Today"),
        react_1["default"].createElement("button", { className: "button invis square icon", onClick: function () { return newWeek(1); } }, ">")));
}
exports["default"] = TimeTableHeader;
