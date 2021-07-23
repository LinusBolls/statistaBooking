import * as index from "../../index";
import * as validate from "../../../shared/validate";
const { hash, randomString } = require("../../jwt");
const { sendMail } = require("../../mail");
import * as interfaces from "../../../shared/interfaces";
const { input } = validate;

let authToken;
index.authToken.then(res => (authToken = res));
let mailConfirmToken;
index.mailConfirmToken.then(res => (mailConfirmToken = res));

const registerQuery = {
  token: input.user.token,
  data: {
    email: input.user.email,
    password: [...input.user.password, "required"],
  },
};
const register = async (req: any, res: any) => {
  const tokenData = authToken.auth(req.body.token);
  const newUser: any = new index.User(req.body.data);

  if (tokenData === false || tokenData.isAdmin === false) {
    if (
      !index.AppOptions.isSelfRegistryAllowed ||
      !newUser.password ||
      newUser.isAdmin
    ) {
      res.type("json").send({
        success: false,
        reason: "Error: Missing authorization for that action",
      });
      return;
    }
  }
  if (tokenData) newUser.isSelfCreated = false;
  else newUser.isSelfCreated = true;
  if (Array.isArray(req.body.data)) {
    //important
  }
  res.type("json").send(await registerUser(newUser));
};
function determineBookingLimit(user: interfaces.IUser): Number | false {
  if (user.isSelfCreated) return index.AppOptions.defaultBookingLimit;
  if (!user.bookingLimit) {
    return user.isAdmin ? false : index.AppOptions.defaultBookingLimit;
  }
  return user.bookingLimit as any;
}
async function registerUser(
  user: interfaces.IUser
): Promise<interfaces.IServerResponse> {
  //this is the case if an admin creates the user
  if (typeof user.password == null) user.password = randomString(10);

  user.hash = hash(user.password as string);
  user.password = undefined;
  user.isConfirmed = false;
  user.bookingLimit = determineBookingLimit(user);
  try {
    //will throw err if email already registered
    await user.save();
  } catch (e) {
    return { success: false, reason: "Error saving user: " + e };
  }
  const confirmationLink = `${
    process.argv[2] === "prod"
      ? "https://booking.der-hedonistische-bote.com"
      : "http://192.168.178.78:80"
  }/api/confirm/${authToken.new({
    email: user.email,
    hash: user.hash,
  })}`;
  const mailSuccess: boolean = await sendMail(
    user.email as string,
    "Confirm your Email",
    `Confirm under ${confirmationLink}`,
    `<a href="${confirmationLink}">Confirm</a>`
  );
  return mailSuccess
    ? { success: true }
    : { success: false, reason: "Error delivering confirmation mail" };
}
export = { query: registerQuery, handler: register };
