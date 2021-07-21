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
var index = __importStar(require("../../index"));
var validate_1 = require("../../../shared/validate");
var jwt_1 = require("../../jwt");
var authToken;
index.authToken.then(function (res) { return (authToken = res); });
var mailConfirmToken;
index.mailConfirmToken.then(function (res) { return (mailConfirmToken = res); });
var loginQuery = {
    data: {
        email: validate_1.input.user.email,
        password: validate_1.input.user.password,
    },
};
var validateMagicLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenData, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tokenData = mailConfirmToken.auth(req.params.token);
                if (!tokenData) {
                    res
                        .type("html")
                        .status(412)
                        .send("Sorry, the server was not able to decrypt your token :(");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, loginUser({
                        email: tokenData.email,
                        hash: tokenData.hash,
                    }, true)];
            case 1:
                result = _a.sent();
                if (!result.success) {
                    res.type("html").status(412).send(result.reason);
                    return [2 /*return*/];
                }
                res.redirect("/confirm/" +
                    req.params.token +
                    "||" +
                    encodeURIComponent(JSON.stringify(result.data.userInfo)));
                return [2 /*return*/];
        }
    });
}); };
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res.type("json")).send;
                    return [4 /*yield*/, loginUser({
                            email: req.body.data.email,
                            hash: jwt_1.hash(req.body.data.password),
                        })];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function loginUser(_a, isThroughEmailConfirmationLink) {
    var email = _a.email, hash = _a.hash;
    if (isThroughEmailConfirmationLink === void 0) { isThroughEmailConfirmationLink = false; }
    return __awaiter(this, void 0, void 0, function () {
        var modifyQuery, matchingUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    modifyQuery = isThroughEmailConfirmationLink
                        ? { isConfirmed: true }
                        : {};
                    return [4 /*yield*/, index.User.findOneAndUpdate({
                            email: email,
                            hash: hash,
                        }, modifyQuery)];
                case 1:
                    matchingUser = _b.sent();
                    return [2 /*return*/, matchingUser
                            ? {
                                success: true,
                                data: {
                                    token: authToken.new({
                                        email: matchingUser.email,
                                        isAdmin: matchingUser.isAdmin,
                                    }),
                                    isFirstLogin: (matchingUser === null || matchingUser === void 0 ? void 0 : matchingUser.isConfirmed) === false,
                                    userInfo: {
                                        firstName: matchingUser.firstName,
                                        lastName: matchingUser.lastName,
                                        isAdmin: matchingUser.isAdmin,
                                        bookingLimit: matchingUser.bookingLimit,
                                        booked: matchingUser.booked,
                                    },
                                },
                            }
                            : {
                                success: false,
                                reason: "Error: Account doesn't exist or the password is invalid",
                            }];
            }
        });
    });
}
module.exports = {
    query: loginQuery,
    handler: loginHandler,
    validateMagicLink: validateMagicLink,
};
