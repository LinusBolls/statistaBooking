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

const createQuery = {
  token: [...input.user.token, "required"],
  data: {
    date: [...input.schedule.date, "required"],
    slot: [...input.schedule.slot, "required"],
    user: input.schedule.user,
    room: [...input.schedule.room, "required"],
  },
};
const bookSchedule = async (req: any, res: any) => {
  const tokenData = authToken.auth(req.body.token);

  if (tokenData === false) {
    res.type("json").send({
      success: false,
      reason: "Error: Missing authorization for that action",
    });
    return;
  }
  const newSchedule: any = new index.Schedule(req.body.data);
  if (!newSchedule.user) newSchedule.user = tokenData.email;
  const newDate = moment(newSchedule.date, dateFormat);
  if (
    !newDate.isValid() ||
    newDate.isBefore(moment()) ||
    newDate.isAfter(moment().add(maxAdvancedBookingDays, "days"))
  ) {
    res.type("json").send({
      success: false,
      reason: "Error: Invalid date",
    });
    return;
  }
  newSchedule.date = newDate.toISOString();
  newSchedule.userDateSlot =
    newSchedule.user + newSchedule.date + newSchedule.slot;

  const user = await index.User.findOneAndUpdate(
    {
      email: tokenData.email,
      $where:
        "(this.bookingLimit > this.booked) || (this.bookingLimit === false)",
    },
    { $inc: { booked: 1 } }
  );
  if (!user) {
    res
      .type("json")
      .send({ success: false, reason: "Error: booking limit reached" });
    return;
  }
  const concurrentSchedules = await index.Schedule.find({
    date: moment(req.body.data.date, dateFormat).toISOString(),
    slot: req.body.data.slot,
    room: req.body.data.room,
  });
  const room = await index.Room.findOne({
    title: req.body.data.room,
    workstations: { $gt: concurrentSchedules.length },
  });
  if (!room) {
    res.type("json").send({
      success: false,
      reason: "Error: Room doesnt exist or is already fully booked",
    });
    return;
  }
  try {
    await newSchedule.save();
  } catch (e) {
    res
      .type("json")
      .send({ success: false, reason: "Error saving schedule: " + e });
    return;
  }
  return res.type("json").send({
    success: true,
    data: { newBookingLimit: user.bookingLimit, booked: user.booked + 1 },
  });
};
export { createQuery as query, bookSchedule as handler };
