import React, { useEffect, useState } from "react";
import { Link } from "./CustomLinks";
import AccountInfo from "./AccountInfo";
import moment from "moment";
import { useParams } from "react-router-dom";

export default function MenuButton({ user }: any) {
  const [open, setOpen] = useState(false);
  const location = useParams();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <>
      <button
        id="menuButton"
        className={
          "button invis square icon menuButton" +
          (open ? " menuButton--open" : "")
        }
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={
          "flyoutMenu__shadow" + (open ? " flyoutMenu__shadow--open" : "")
        }
        onClick={() => setOpen(!open)}
      ></div>
      <div
        className={
          "flyoutMenu" + (open ? " flyoutMenu--open" : " flyoutMenu--closed")
        }
      >
        <AccountInfo user={user} className="accountInfo panel__midPageHeader" />
        <Link to="/timetable" className="button invis long text">
          <i className="far fa-calendar-alt"></i> Timetable
        </Link>
        <Link to="/schedules" className="button invis long text">
          <i className="fas fa-desktop"></i> Your Schedule
        </Link>
        <Link to="/rooms" className="button invis long text">
          <i className="fas fa-desktop"></i> Rooms
        </Link>
        <Link to="/users" className="button invis long text">
          <i className="fas fa-users"></i> Users
        </Link>
        <p className="copyrightNotice">
          © Linus Bolls {moment().format("YYYY")}
        </p>
      </div>
    </>
  );
}
