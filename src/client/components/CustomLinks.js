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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.LinkStatistaLogo = exports.LinkButtonIcon = exports.LinkButtonText = void 0;
var react_1 = __importStar(require("react"));
var newCustomLink = function (defaultClassName) {
    return react_1.forwardRef(function (props, ref) {
        var navigate = props.navigate, className = props.className, rest = __rest(props, ["navigate", "className"]);
        return (react_1["default"].createElement("a", __assign({}, rest, { className: "pageLink" }),
            react_1["default"].createElement("button", __assign({}, (className || { className: defaultClassName })), props.children)));
    });
};
var LinkButtonText = newCustomLink("button long invis text");
exports.LinkButtonText = LinkButtonText;
var LinkButtonIcon = newCustomLink("button square invis icon");
exports.LinkButtonIcon = LinkButtonIcon;
var LinkStatistaLogo = react_1.forwardRef(function (props, ref) {
    var navigate = props.navigate, rest = __rest(props, ["navigate"]);
    return (react_1["default"].createElement("a", { style: {
            height: "100%",
            display: "flex",
            alignItems: "center",
            margin: "auto"
        } },
        react_1["default"].createElement("img", { src: "/statistaLogoWhite.svg", alt: "Statista", height: "45%" })));
});
exports.LinkStatistaLogo = LinkStatistaLogo;
