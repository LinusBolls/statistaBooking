import * as validate from "../../../shared/validate";
import * as interfaces from "../../../shared/interfaces";
import {
  dateFormat,
  weekDays,
  timeSlots,
} from "../../../shared/sharedProjectConfig";
import * as index from "../../index";
import moment from "moment";
const { input } = validate;

let authToken;
index.authToken.then(res => (authToken = res));

const requestQuery = {
  token: [...input.user.token, "required"],
  data: {
    week: [...input.schedule.date, "required"],
  },
};
const getSchedule = async (req: any, res: any) => {
  const tokenData = authToken.auth(req.body.token);

  if (tokenData === false) {
    res.type("json").send({
      success: false,
      reason: "Error: Missing authorization for that action",
    });
    return;
  }
  const newDate = moment(req.body.data.week, dateFormat);
  if (!newDate.isValid()) {
    res.type("json").send({
      success: false,
      reason: "Error: Invalid date",
    });
    return;
  }
  const weekStart = newDate.startOf("week").toISOString();
  const weekEnd = newDate.endOf("week").toISOString();

  /*   Doing the stuff   */
  const rooms = await index.Room.find({});
  const roomAmount = rooms.length;
  const deskAmount = rooms.reduce((sum, room) => sum + room.workstations, 0);
  const schedules = await index.Schedule.find({
    date: { $gte: weekStart, $lte: weekEnd },
  });

  const days = {};
  for (let i = 0; i < 7; i++) {
    const day = {};
    const slots = timeSlots.forEach(
      slot => (day[slot] = { rooms: roomAmount, desks: deskAmount })
    );
    days[weekDays[i]] = day;
  }
  schedules.forEach(schedule => {
    const slot = days[weekDays[moment(schedule.date).day()]][schedule.slot];
    slot.desks--;
    if (schedule.user === tokenData.email) slot.isBookedByUser = true;
  });
  res.type("json").send({
    success: true,
    data: days,
  });
};
export { requestQuery as query, getSchedule as handler };
