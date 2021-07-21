"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeslot = exports.jobType = exports.seniority = exports.scheduleSchema = exports.roomSchema = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
var isStrLen = function (str, min, max) {
    return str.length >= min && str.length <= max;
};
var jobType;
(function (jobType) {
    jobType[jobType["Developer"] = 0] = "Developer";
    jobType[jobType["Management"] = 1] = "Management";
    jobType[jobType["Designer"] = 2] = "Designer";
})(jobType || (jobType = {}));
exports.jobType = jobType;
var timeslot;
(function (timeslot) {
    timeslot[timeslot["6:00"] = 0] = "6:00";
    timeslot[timeslot["9:00"] = 1] = "9:00";
    timeslot[timeslot["12:00"] = 2] = "12:00";
    timeslot[timeslot["15:00"] = 3] = "15:00";
    timeslot[timeslot["18:00"] = 4] = "18:00";
    timeslot[timeslot["21:00"] = 5] = "21:00";
})(timeslot || (timeslot = {}));
exports.timeslot = timeslot;
var seniority;
(function (seniority) {
    seniority[seniority["Junior"] = 0] = "Junior";
    seniority[seniority["Senior"] = 1] = "Senior";
})(seniority || (seniority = {}));
exports.seniority = seniority;
var userSchema = new mongoose_1.Schema({
    isSelfCreated: Boolean,
    firstName: {
        type: String,
        required: true,
        validate: function (s) { return isStrLen(s, 1, 99); },
    },
    lastName: {
        type: String,
        required: true,
        validate: function (s) { return isStrLen(s, 1, 99); },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
        validate: function (s) { return isStrLen(s, 1, 99) && s.includes("@"); },
    },
    password: { type: String, required: false },
    hash: { type: String, required: false },
    isAdmin: Boolean,
    isConfirmed: Boolean,
    personalInfo: {
        type: String,
        required: false,
        default: "Hi, I'm using Statista Booking!",
        validate: function (s) { return isStrLen(s, 0, 999); },
    },
    jobType: { type: String, enum: jobType, required: false },
    seniority: { type: String, enum: seniority, required: false },
    bookingLimit: { type: mongoose_1.Schema.Types.Mixed, required: true },
    booked: { type: Number, required: true, default: 0 },
});
exports.userSchema = userSchema;
var roomSchema = new mongoose_1.Schema({
    floor: { type: Number, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    workstations: { type: Number, required: true },
});
exports.roomSchema = roomSchema;
var scheduleSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    slot: { type: String, required: true },
    user: { type: String, required: false },
    room: { type: String, required: true },
});
exports.scheduleSchema = scheduleSchema;
