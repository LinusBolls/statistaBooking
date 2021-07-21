"use strict";
exports.__esModule = true;
exports.fireUserinfoUpdateEvent = exports.fireBookingViewEvent = exports.newBreakpointListener = exports.logout = exports.fireLoginEvent = exports.Event = void 0;
var sharedProjectConfig_1 = require("../shared/sharedProjectConfig");
var Event = {
    LOGIN: "login",
    BREAKPOINT_TRIGGER: "breakpointTrigger",
    USERINFO_UPDATE: "userinfoUpdate",
    BOOKING_VIEW: "bookingView"
};
exports.Event = Event;
var fireLoginEvent = function (user) {
    window.dispatchEvent(new CustomEvent(Event.LOGIN, {
        detail: user
    }));
    window.location.replace(sharedProjectConfig_1.domain + "/" + (user == null ? "login" : ""));
};
exports.fireLoginEvent = fireLoginEvent;
var fireBookingViewEvent = function (targetMoment) {
    return window.dispatchEvent(new CustomEvent(Event.BOOKING_VIEW, {
        detail: targetMoment
    }));
};
exports.fireBookingViewEvent = fireBookingViewEvent;
var fireUserinfoUpdateEvent = function (userInfo) {
    window.dispatchEvent(new CustomEvent(Event.USERINFO_UPDATE, {
        detail: JSON.stringify(userInfo)
    }));
};
exports.fireUserinfoUpdateEvent = fireUserinfoUpdateEvent;
var logout = function () { return fireLoginEvent(null); };
exports.logout = logout;
var getScreenType = function () {
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    switch (true) {
        case width > 1200:
            return 1200;
        case width > 1000:
            return 800;
        case width > 600:
            return 600;
        default:
            return 0;
    }
};
var screenType = getScreenType();
window.onresize = function () {
    var newScreenType = getScreenType();
    if (newScreenType === screenType)
        return;
    screenType = newScreenType;
    window.dispatchEvent(new CustomEvent(Event.BREAKPOINT_TRIGGER, { detail: newScreenType }));
};
var newBreakpointListener = function () {
    return [
        screenType,
        function (handler) {
            return window.addEventListener(Event.BREAKPOINT_TRIGGER, (function (e) {
                return handler(e.detail);
            }));
        },
    ];
};
exports.newBreakpointListener = newBreakpointListener;
