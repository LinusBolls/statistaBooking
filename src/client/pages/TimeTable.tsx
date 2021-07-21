import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  domain,
  weekDays,
  dateFormat,
  maxAdvancedBookingDays,
} from "../../shared/sharedProjectConfig";
import { fireBookingViewEvent, Event } from "../event";
import { LinkButtonText } from "../components/CustomLinks";
import TimeTableHeader from "../components/TimeTableHeader";
import BookingPanel from "../components/BookingPanel";

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

const displayResponse = (response: any) => {
  const output = document.getElementById("output") as any;
  output.innerHTML = JSON.stringify(response);
};
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
    .catch(displayResponse);

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
    .catch(displayResponse);

export default function TimeTable({ user }: any) {
  let { date } = useParams() as any;

  const [targetMoment, setTargetMoment] = useState<String | null>(null);
  const [weekData, setWeekData] = useState<IWeek | null>(null);
  const [rooms, setRooms] = useState<any>(null);

  useEffect(() => {
    if (!moment(date, dateFormat, true).isValid()) redirect(moment());
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

  return (
    <div className="panel">
      <TimeTableHeader
        {...{
          isCurrentWeek,
          newWeek,
          date,
        }}
      />
      <p id="output"></p>
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
        <BookingPanel
          {...{
            targetMoment,
            user,
            rooms,
            displayResponse,
          }}
        />
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
