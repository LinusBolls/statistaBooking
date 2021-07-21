import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { LinkButtonText } from "../components/CustomLinks";
import axios from "axios";
import {
  domain,
  weekDays,
  dateFormat,
  maxAdvancedBookingDays,
} from "../../shared/sharedProjectConfig";
import { fireUserinfoUpdateEvent, fireBookingViewEvent, Event } from "../event";

const weekStartAndEnd = (date: string, formatOption = "l") =>
  `${moment(date, dateFormat).startOf("week").format(formatOption)}
   - 
   ${moment(date, dateFormat).endOf("week").format(formatOption)}`;

const formatOptions = ["DD/MM"];

const fetchWeekData = async (date: string): Promise<IWeek | null> =>
  await axios
    .post(
      domain + "/api/view/schedule",
      {
        token: document.cookie.replace("token=", ""),
        data: {
          week: date,
        },
      },
      {}
    )
    .then((res: any) => res.data.data)
    .catch(e => alert(e));
const fetchRooms = async (): Promise<any> =>
  await axios
    .post(
      domain + "/api/view/room",
      {
        token: document.cookie.replace("token=", ""),
      },
      {}
    )
    .then((res: any) => res.data.data)
    .catch(e => alert(e));
interface ITimeSlot {
  rooms: number;
  desks: number;
}
interface IDay {
  "6:00": ITimeSlot;
  "9:00": ITimeSlot;
  "12:00": ITimeSlot;
  "15:00": ITimeSlot;
  "18:00": ITimeSlot;
}
interface IWeek {
  mon: IDay;
  tue: IDay;
  wed: IDay;
  thu: IDay;
  fri: IDay;
  sat: IDay;
  sun: IDay;
}
const redirect = (mom: any) =>
  window.location.replace(domain + "/timetable/" + mom.format(dateFormat));

export default function TimeTable({ user }: any) {
  let { date } = useParams() as any;
  if (!moment(date, dateFormat, true).isValid()) redirect(moment());

  const [targetMoment, setTargetMoment] = useState<String | null>(null);
  const [weekData, setWeekData] = useState<IWeek | null>(null);
  const [formatOption, setFormatOption] = useState<number>(0);
  const [rooms, setRooms] = useState<any>(null);

  useEffect(() => {
    fetchWeekData(date).then(res => setWeekData(res));
    fetchRooms().then(res => setRooms(res));
    window.addEventListener(Event.BOOKING_VIEW, (e: any) =>
      setTargetMoment(e.detail)
    );
    window.addEventListener(Event.USERINFO_UPDATE, (e: any) =>
      fetchWeekData(date).then(res => setWeekData(res))
    );
  }, []);
  if (!user)
    return (
      <div>
        <Link to="/login" component={LinkButtonText}>
          Log in
        </Link>
        to view this weeks schedule
      </div>
    );
  const newWeek = (weekAmount: number) =>
    weekAmount === 0
      ? redirect(moment())
      : redirect(moment(date, dateFormat).add(weekAmount, "weeks"));

  const isCurrentWeek =
    moment(date, dateFormat).startOf("week").format(dateFormat) ===
    moment().startOf("week").format(dateFormat);

  const incrementFormatOption = () => {
    setFormatOption(formatOption + 1);
    if (formatOption > formatOptions.length - 2) setFormatOption(0);
  };
  return (
    <div className="panel">
      <div
        className={
          "header panel__header timetable__header" +
          (isCurrentWeek ? " timetable__header--currentWeek" : "")
        }
      >
        <button
          className="button invis square icon"
          onClick={() => newWeek(-1)}
        >
          {"<"}
        </button>
        <p onClick={incrementFormatOption} style={{ margin: "auto" }}>
          {weekStartAndEnd(date, formatOptions[formatOption])}
        </p>
        <button
          className={
            "button invis long text" +
            (isCurrentWeek ? " timetable__todayButton--isCurrentWeek" : "")
          }
          onClick={() => newWeek(0)}
        >
          Today
        </button>
        <button className="button invis square icon" onClick={() => newWeek(1)}>
          {">"}
        </button>
      </div>
      <table className="timetable">
        <tbody>
          {weekData ? (
            <>
              <tr className="timetable__column">
                <th className="timetable__yearDisplay">
                  {moment(date, dateFormat).format("YYYY")}
                </th>
                <th>6:00 - 9:00</th>
                <th>9:00 - 12:00</th>
                <th>12:00 - 15:00</th>
                <th>15:00 - 18:00</th>
                <th>18:00 - 21:00</th>
              </tr>
              {Object.values(weekData as IWeek).map((data: IDay, day: number) =>
                columnMap(data, day, isCurrentWeek, date, targetMoment)
              )}
            </>
          ) : (
            <tr>
              <th>Fetching...</th>
            </tr>
          )}
        </tbody>
      </table>
      {targetMoment ? (
        <BookingView targetMoment={targetMoment} user={user} rooms={rooms} />
      ) : (
        ""
      )}
    </div>
  );
}
const columnMap = (
  day: IDay,
  weekDay: number,
  isCurrentWeek: boolean,
  date,
  targetMoment
) => (
  <tr
    key={weekDay}
    className={
      "timetable__column" +
      (isCurrentWeek && moment().subtract(1, "day").day() === weekDay
        ? " timetable__column--today"
        : "")
    }
  >
    <th>{weekDays[weekDay]}</th>
    {Object.entries(day).map((slot: any) =>
      timeslotMap(slot, date, weekDay, targetMoment)
    )}
  </tr>
);
const timeslotMap = ([hour, data]: any, date, weekDay, targetMoment) => {
  const slotMoment = moment(date, dateFormat)
    .startOf("week")
    .add(weekDay, "days")
    .add(hour.split(":")[0], "hours");
  const isBookable =
    slotMoment.isAfter(moment()) &&
    slotMoment.isBefore(moment().add(maxAdvancedBookingDays, "days")) &&
    data.desks > 0;

  return (
    <td
      key={weekDay + hour}
      onClick={() => {
        if (isBookable) fireBookingViewEvent(slotMoment.toISOString());
      }}
      className={
        "timetable__timeslot" +
        (isBookable ? " timetable__timeslot--bookable" : "") +
        (targetMoment === slotMoment.toISOString()
          ? " timetable__timeslot--selected"
          : "") +
        (data.isBookedByUser ? " timetable__timeslot--booked" : "")
      }
    >
      {data.desks}
    </td>
  );
};
function BookingView({ targetMoment, user, rooms }: any) {
  const isBookingLimitReached =
    user.bookingLimit === false ? false : user.booked >= user.bookingLimit;
  function book() {
    const Room = document.getElementById("Room") as any;
    axios
      .post(
        domain + "/api/book/schedule",
        {
          token: document.cookie.replace("token=", ""),
          data: {
            room: Room.value,
            date: moment(targetMoment).format(dateFormat),
            slot: moment(targetMoment).format("H:00"),
          },
        },
        {}
      )
      .then((res: any) =>
        res.data.success
          ? fireUserinfoUpdateEvent({
              bookingLimit: res.data.data.newBookingLimit,
              booked: res.data.data.booked,
            })
          : alert("something went wrong")
      )
      .catch(e => alert(e));
  }
  return (
    <div>
      <div className="header panel__midPageHeader">
        {moment(targetMoment).format("DD/MM") +
          " " +
          moment(targetMoment).format("H:00") +
          " - " +
          moment(targetMoment).add(3, "hours").format("H:00")}
      </div>
      <BookingLimitDisplay user={user} />
      <select id="Room" className="customSelect" name="Room">
        {rooms.map(({ title, floor, workstations, description }: any) => (
          <option value={title}>{`${title} - Floor ${floor}`}</option>
        ))}
      </select>
      <button
        className="button long cta0"
        onClick={isBookingLimitReached ? () => {} : book}
        {...(isBookingLimitReached ? { disabled: true } : {})}
      >
        Book
      </button>
    </div>
  );
}
const BookingLimitDisplay = (user: any) => {
  return (
    <div className="noselect">
      {`Your Bookings: ${user.user.booked} / `}
      {user.user.bookingLimit === false ? (
        <i className="fas fa-infinity"></i>
      ) : (
        user.user.bookingLimit
      )}
    </div>
  );
};
