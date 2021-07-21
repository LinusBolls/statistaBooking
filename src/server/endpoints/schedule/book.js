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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.query = void 0;
var validate = __importStar(require("../../../shared/validate"));
var sharedProjectConfig_1 = require("../../../shared/sharedProjectConfig");
var index = __importStar(require("../../index"));
var input = validate.input;
var moment_1 = __importDefault(require("moment"));
var authToken;
index.authToken.then(function (res) { return (authToken = res); });
var createQuery = {
    token: __spreadArray(__spreadArray([], input.user.token), ["required"]),
    data: {
        date: __spreadArray(__spreadArray([], input.schedule.date), ["required"]),
        slot: __spreadArray(__spreadArray([], input.schedule.slot), ["required"]),
        user: input.schedule.user,
        room: __spreadArray(__spreadArray([], input.schedule.room), ["required"]),
    },
};
exports.query = createQuery;
var bookSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenData, newSchedule, newDate, user, concurrentSchedules, room, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tokenData = authToken.auth(req.body.token);
                if (tokenData === false) {
                    res.type("json").send({
                        success: false,
                        reason: "Error: Missing authorization for that action",
                    });
                    return [2 /*return*/];
                }
                newSchedule = new index.Schedule(req.body.data);
                if (!newSchedule.user)
                    newSchedule.user = tokenData.email;
                newDate = moment_1.default(newSchedule.date, sharedProjectConfig_1.dateFormat);
                if (!newDate.isValid() ||
                    newDate.isBefore(moment_1.default()) ||
                    newDate.isAfter(moment_1.default().add(sharedProjectConfig_1.maxAdvancedBookingDays, "days"))) {
                    res.type("json").send({
                        success: false,
                        reason: "Error: Invalid date",
                    });
                    return [2 /*return*/];
                }
                newSchedule.date = newDate.toISOString();
                return [4 /*yield*/, index.User.findOneAndUpdate({
                        email: tokenData.email,
                        $where: "(this.bookingLimit > this.booked) || (this.bookingLimit === false)",
                    }, { $inc: { booked: 1 } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res
                        .type("json")
                        .send({ success: false, reason: "Error: booking limit reached" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, index.Schedule.find({
                        date: moment_1.default(req.body.data.date, sharedProjectConfig_1.dateFormat).toISOString(),
                        slot: req.body.data.slot,
                        room: req.body.data.room,
                    })];
            case 2:
                concurrentSchedules = _a.sent();
                return [4 /*yield*/, index.Room.findOne({
                        title: req.body.data.room,
                        workstations: { $gt: concurrentSchedules.length },
                    })];
            case 3:
                room = _a.sent();
                if (!room) {
                    res.type("json").send({
                        success: false,
                        reason: "Error: Room doesnt exist or is already fully booked",
                    });
                    return [2 /*return*/];
                }
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, newSchedule.save()];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                res
                    .type("json")
                    .send({ success: false, reason: "Error saving schedule: " + e_1 });
                return [2 /*return*/];
            case 7: return [2 /*return*/, res.type("json").send({
                    success: true,
                    data: { newBookingLimit: user.bookingLimit, booked: user.booked + 1 },
                })];
        }
    });
}); };
exports.handler = bookSchedule;
