import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { domain, dateFormat } from "../../shared/sharedProjectConfig";
import { Link } from "react-router-dom";
import { LinkButtonText } from "../components/CustomLinks";

export default function ScheduleView({ user }: any) {
  if (!user)
    return (
      <div>
        <Link to="/login" component={LinkButtonText}>
          Log in
        </Link>
        to view your schedules
      </div>
    );
  const [schedules, setSchedules] = useState<[] | null>(null);
  useEffect(() => {
    axios
      .post(
        domain + "/api/booked/schedules",
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
