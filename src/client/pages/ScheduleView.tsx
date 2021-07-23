import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { dateFormat } from "../../shared/sharedProjectConfig";
import { Link } from "../components/CustomLinks";

export default function ScheduleView({ user }: any) {
  if (!user)
    return (
      <div>
        <Link to="/login">Log in</Link>
        to view your schedules
      </div>
    );
  const [schedules, setSchedules] = useState<[] | null>(null);
  useEffect(() => {
    axios
      .post(
        "/api/booked/schedules",
        {
          token: document.cookie.replace("token=", ""),
        },
        {}
      )
      .then((res: any) => setSchedules(res.data.data));
  }, []);
  return (
    <div className="panel">
      {" "}
      <div className="header panel__header">Your Schedules</div>
      {schedules ? schedules.map(mapSchedule) : "Fetching..."}
    </div>
  );
}
const mapSchedule = ({ date, room, slot }: any) => (
  <p
    className={
      moment(date).isBefore(moment().add(date.split(":")[0], "hours"))
        ? "scheduleCard--expired"
        : ""
    }
  >{`${room} (${moment(date).format(dateFormat)} at ${slot})`}</p>
);
