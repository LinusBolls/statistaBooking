const Validator = require("validatorjs");
import * as interfaces from "./interfaces";
import { floors } from "./sharedProjectConfig";

const validate = (
  body: object,
  rules: object,
  customMessages = {}
): Promise<object> => {
  return new Promise((resolve, _) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => resolve({ success: true }));
    validation.fails(() =>
      resolve({ success: false, reason: validation.errors })
    );
  });
};
const validateReqBody = (query: object) => {
  return async (req: any, res: any, next: any) => {
    const data: any = await validate(req.body, query);
    data.success
      ? next()
      : res
          .type("json")
          .status(200)
          .send({
            success: false,
            reason: Object.values(
              JSON.parse(JSON.stringify(data.reason)).errors
            ).map((e: any) => e[0].replace("data.", "")),
          });
  };
};
const input = {
  user: {
    token: ["string"],
    firstName: ["string", "min:1"],
    lastName: ["string", "min:1"],
    email: ["email"],
    password: ["string", "min:10"],
    description: ["string"],
    isAdmin: ["boolean"],
    seniority: [{ in: Object.values(interfaces.seniority) }, "string"],
    jobType: [{ in: Object.values(interfaces.jobType) }, "string"],
    bookingLimit: [], //integer or false
  },
  room: {
    floor: [{ in: floors }],
    title: ["string"],
    description: ["string"],
    workstations: ["integer"],
    userDateSlot: ["string"],
  },
  schedule: {
    date: ["string"],
    slot: [{ in: Object.values(interfaces.timeslot) }, "string"],
    user: ["string"],
    room: ["string"],
  },
};
export { validate, validateReqBody, input };
