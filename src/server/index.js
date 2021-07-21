"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.mailConfirmToken = exports.msg = exports.AppOptions = exports.Schedule = exports.Room = exports.User = exports.app = exports.server = exports.db = void 0;
var bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");
var ip = require("ip");
var _a = require("./jwt"), newJwtMint = _a.newJwtMint, hash = _a.hash;
var _b = require("../shared/interfaces"), userSchema = _b.userSchema, roomSchema = _b.roomSchema, scheduleSchema = _b.scheduleSchema;
var AppOptions = require("../../privateProjectConfig");
exports.AppOptions = AppOptions;
var validateReqBody = require("../shared/validate").validateReqBody;
var app = express();
exports.app = app;
var User = mongoose.model("User", userSchema);
exports.User = User;
var Room = mongoose.model("Room", roomSchema);
exports.Room = Room;
var Schedule = mongoose.model("Schedule", scheduleSchema);
exports.Schedule = Schedule;
var staticDir = path.resolve(__dirname, "../../dist");
var mongoOptions = {
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(staticDir));
/*   Myb export this sometime idk   */
var msg = {
    config: {
        valid: "[Server][Config] AppOptions are valid json",
        invalid: "[Server][Config] AppOptions are not valid json",
    },
    mongo: {
        connected: function (url) {
            return "[Server][MongoDB] Successfully connected to " + url;
        },
    },
    express: {
        connected: function (ip, port) {
            return "[Server][Express] Listening on http://" + ip + ":" + port;
        },
    },
};
exports.msg = msg;
var server = app.listen(AppOptions.appPort || 3000, function () {
    return console.log(msg.express.connected(ip.address(), server.address().port));
});
exports.server = server;
/*   MongoDB   */
mongoose.connect(AppOptions.mongoUrl, mongoOptions);
var db = mongoose.connection;
exports.db = db;
db.once("open", function () {
    User.deleteMany({}, function (err) {
        console.log("[Server][MongoDB][User] Cleared all users");
        var defaultAdmin = new User({
            firstName: "Default",
            lastName: "Admin",
            email: AppOptions.defaultAdmin.email,
            hash: hash(AppOptions.defaultAdmin.password),
            isAdmin: true,
            isConfirmed: true,
            bookingLimit: false,
        });
        defaultAdmin.save();
    });
    Schedule.deleteMany({}, function (err) { return console.log("cleared all schedules"); });
    console.log(msg.mongo.connected(AppOptions.mongoUrl));
});
db.on("error", console.error.bind(console, "[Server][MongoDB] Error: "));
/*   Utility Stuff   */
var mailConfirmToken = newJwtMint();
exports.mailConfirmToken = mailConfirmToken;
var authToken = newJwtMint();
exports.authToken = authToken;
mailConfirmToken.then(function (res) { return (exports.mailConfirmToken = mailConfirmToken = res); });
authToken.then(function (res) { return (exports.authToken = authToken = res); });
var register = require("./endpoints/user/register");
var login = require("./endpoints/user/login");
var createRoom = require("./endpoints/room/create");
var viewRoom = require("./endpoints/room/view");
var bookSchedule = require("./endpoints/schedule/book");
var viewSchedule = require("./endpoints/schedule/view");
var bookedSchedules = require("./endpoints/schedule/viewMySchedules");
app.post("/api/register", validateReqBody(register.query), register.handler);
app.post("/api/login", validateReqBody(login.query), login.handler);
app.get("/api/confirm/:token", login.validateMagicLink);
app.post("/api/create/room", validateReqBody(createRoom.query), createRoom.handler);
app.post("/api/book/schedule", validateReqBody(bookSchedule.query), bookSchedule.handler);
app.post("/api/view/schedule", validateReqBody(viewSchedule.query), viewSchedule.handler);
app.post("/api/view/room", validateReqBody(viewRoom.query), viewRoom.handler);
app.post("/api/booked/schedules", validateReqBody(bookedSchedules.query), bookedSchedules.handler);
app.get("*", function (req, res) { return res.sendFile(staticDir + "/index.html"); });
