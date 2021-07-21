import * as validate from "../../../shared/validate";
import * as interfaces from "../../../shared/interfaces";
import {
  dateFormat,
  maxAdvancedBookingDays,
} from "../../../shared/sharedProjectConfig";
import * as index from "../../index";
const { input } = validate;
import moment from "moment";

let authToken;
index.authToken.then(res => (authToken = res));

const deleteQuery = {
  token: [...input.user.token, "required"],
};

const deleteSchedule = async (req: any, res: any) => {
  const tokenData = authToken.auth(req.body.token);

  if (tokenData === false) {
    res.type("json").send({
      success: false,
      reason: "Error: Missing authorization for that action",
    });
    return;
  }
  const success = await index.Schedule.deleteOne({ user: tokenData.email });
};
