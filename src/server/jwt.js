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
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = exports.isJson = exports.hash = exports.newJwtMint = void 0;
var crypto = __importStar(require("crypto"));
/**
 * Obviously not cryptographically secure!
 * @param {number} length
 * @returns {String} moin master
 */
function randomString(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        result += characters[Math.random() * characters.length];
    return result;
}
exports.randomString = randomString;
var toBase64 = function (str) { return Buffer.from(str).toString("base64"); };
var fromBase64 = function (str) {
    return Buffer.from(str, "base64").toString("ascii");
};
var hash = function (str) {
    return crypto.createHash("md5").update(str).digest("hex");
};
exports.hash = hash;
var isJson = function (str) {
    try {
        return !!JSON.parse(str);
    }
    catch (e) {
        return false;
    }
};
exports.isJson = isJson;
var newJwt = function (payload, secret) {
    if (!secret)
        throw new Error("newJwt() was called with invalid secret, an instance of newJwtMint() was probably called before the secret finished generating");
    var encodedPayload = toBase64(JSON.stringify(payload));
    return encodedPayload + "." + hash(encodedPayload + "." + toBase64(secret));
};
var jwtAuth = function (jwtToken, secret) {
    if (typeof jwtToken !== "string" || !jwtToken.includes("."))
        return false;
    if (!secret)
        throw new Error("isJwtValid() was called with invalid secret, an instance of newJwtMint() was probably called before the secret finished generating");
    var possiblyJson = fromBase64(jwtToken.split(".")[0]);
    if (!isJson(possiblyJson))
        return false;
    var payload = JSON.parse(fromBase64(jwtToken.split(".")[0]));
    if (Date.now() > payload.expiryDate)
        return false;
    return newJwt(payload, secret) === jwtToken ? payload : false;
};
var newSecret = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, _) {
                crypto.randomBytes(64, function (err, buffer) {
                    if (err)
                        throw err;
                    resolve(buffer.toString("hex"));
                });
            })];
    });
}); };
function newJwtMint() {
    return __awaiter(this, void 0, void 0, function () {
        var secret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, newSecret()];
                case 1:
                    secret = _a.sent();
                    return [2 /*return*/, {
                            new: function (payload) { return newJwt(payload, secret); },
                            auth: function (token) { return jwtAuth(token, secret); },
                            newSecret: function () { return newSecret().then(function (res) { return (secret = res); }); },
                        }];
            }
        });
    });
}
exports.newJwtMint = newJwtMint;
