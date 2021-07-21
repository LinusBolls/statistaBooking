import React from "react";
import moment from "moment";
import { dateFormat } from "../../shared/sharedProjectConfig";

const weekStartAndEnd = (date: string, formatOption = "l") =>
  `${moment(date, dateFormat).startOf("week").format(formatOption)}
   - 
   ${moment(date, dateFormat).endOf("week").format(formatOption)}`;

export default function TimeTableHeader({ isCurrentWeek, newWeek, date }: any) {
  return (
    <div
      className={
        "header panel__header timetable__header" +
        (isCurrentWeek ? " timetable__header--currentWeek" : "")
      }
    >
      <button className="button invis square icon" onClick={() => newWeek(-1)}>
        {"<"}
      </button>
      <p style={{ margin: "auto" }}>{weekStartAndEnd(date, "DD/MM")}</p>
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
  );
}
