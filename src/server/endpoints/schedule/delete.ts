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
  data: { userDateSlot: [...input.room.userDateSlot, "required"] },
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
  const success = await index.Schedule.deleteOne({
    userDateSlot: req.body.data.userDateSlot,
    user: tokenData.email,
  }).then(res => res.deletedCount > 0);
  res.type("json").send({ success: success });
};
export { deleteQuery as query, deleteSchedule as handler };
