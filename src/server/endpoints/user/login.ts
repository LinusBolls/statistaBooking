import * as index from "../../index";
import { input } from "../../../shared/validate";
import { hash } from "../../jwt";

let authToken;
index.authToken.then(res => (authToken = res));
let mailConfirmToken;
index.mailConfirmToken.then(res => (mailConfirmToken = res));

const loginQuery = {
  data: {
    email: input.user.email,
    password: input.user.password,
  },
};
const validateMagicLink = async (req: any, res: any) => {
  const tokenData = mailConfirmToken.auth(req.params.token) as any;
  if (!tokenData) {
    res
      .type("html")
      .status(412)
      .send("Sorry, the server was not able to decrypt your token :(");
    return;
  }
  const result = await loginUser(
    {
      email: tokenData.email,
      hash: tokenData.hash,
    },
    true
  );
  if (!result.success) {
    res.type("html").status(412).send(result.reason);
    return;
  }
  res.redirect(
    "/confirm/" +
      req.params.token +
      "||" +
      encodeURIComponent(JSON.stringify(result.data.userInfo))
  );
};
async function loginHandler(req: any, res: any) {
  res.type("json").send(
    await loginUser({
      email: req.body.data.email,
      hash: hash(req.body.data.password),
    })
  );
}
async function loginUser(
  { email, hash }: any,
  isThroughEmailConfirmationLink: boolean = false
): Promise<any> {
  const modifyQuery = isThroughEmailConfirmationLink
    ? { isConfirmed: true }
    : {};
  const matchingUser: any = await index.User.findOneAndUpdate(
    {
      email: email,
      hash: hash,
    },
    modifyQuery
  );
  return matchingUser
    ? {
        success: true,
        data: {
          token: authToken.new({
            email: matchingUser.email,
            isAdmin: matchingUser.isAdmin,
          }),
          isFirstLogin: matchingUser?.isConfirmed === false,
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
      };
}
export = {
  query: loginQuery,
  handler: loginHandler,
  validateMagicLink,
};
