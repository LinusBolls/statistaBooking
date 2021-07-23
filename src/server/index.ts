const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const ip = require("ip");
const { newJwtMint, hash } = require("./jwt");
const {
  userSchema,
  roomSchema,
  scheduleSchema,
} = require("../shared/interfaces");
const AppOptions = require("../../privateProjectConfig");
const { validateReqBody } = require("../shared/validate");

const app = express();
const User = mongoose.model("User", userSchema);
const Room = mongoose.model("Room", roomSchema);
const Schedule = mongoose.model("Schedule", scheduleSchema);
const staticDir = path.resolve(__dirname, "../../dist");
const mongoOptions = {
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

const msg = {
  config: {
    valid: `[Server][Config] AppOptions are valid json`,
    invalid: `[Server][Config] AppOptions are not valid json`,
  },
  mongo: {
    connected: (url: string) =>
      `[Server][MongoDB] Successfully connected to ${url}`,
  },
  express: {
    connected: (ip: number, port: number) =>
      `[Server][Express] Listening on http://${ip}:${port}`,
  },
};
const server = app.listen(AppOptions.appPort || 3000, () =>
  console.log(msg.express.connected(ip.address(), server.address().port))
);

/*   MongoDB   */

mongoose.connect(AppOptions.mongoUrl, mongoOptions);
const db = mongoose.connection;
db.once("open", () => {
  User.deleteMany({}, (err: any) => {
    console.log("[Server][MongoDB][User] Cleared all users");
    const defaultAdmin = new User({
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
  Schedule.deleteMany({}, (err: any) => console.log("cleared all schedules"));
  console.log(msg.mongo.connected(AppOptions.mongoUrl));
});
db.on("error", console.error.bind(console, "[Server][MongoDB] Error: "));

/*   Utility Stuff   */

let mailConfirmToken = newJwtMint();
let authToken = newJwtMint();

mailConfirmToken.then((res: any) => (mailConfirmToken = res));
authToken.then((res: any) => (authToken = res));

const register = require("./endpoints/user/register");
const login = require("./endpoints/user/login");
const createRoom = require("./endpoints/room/create");
const viewRoom = require("./endpoints/room/view");
const bookSchedule = require("./endpoints/schedule/book");
const viewSchedule = require("./endpoints/schedule/view");
const bookedSchedules = require("./endpoints/schedule/viewMySchedules");
const deleteSchedule = require("./endpoints/schedule/delete");

app.post("/api/register", validateReqBody(register.query), register.handler);
app.post("/api/login", validateReqBody(login.query), login.handler);
app.get("/api/confirm/:token", login.validateMagicLink);
app.post(
  "/api/create/room",
  validateReqBody(createRoom.query),
  createRoom.handler
);
app.post(
  "/api/book/schedule",
  validateReqBody(bookSchedule.query),
  bookSchedule.handler
);
app.post(
  "/api/view/schedule",
  validateReqBody(viewSchedule.query),
  viewSchedule.handler
);
app.post("/api/view/room", validateReqBody(viewRoom.query), viewRoom.handler);
app.post(
  "/api/booked/schedules",
  validateReqBody(bookedSchedules.query),
  bookedSchedules.handler
);
app.post(
  "/api/delete/schedule",
  validateReqBody(deleteSchedule.query),
  deleteSchedule.handler
);
app.get("*", (req: any, res: any) => res.sendFile(staticDir + "/index.html"));

export {
  db,
  server,
  app,
  User,
  Room,
  Schedule,
  AppOptions,
  msg,
  mailConfirmToken,
  authToken,
};
