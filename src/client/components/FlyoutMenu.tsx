import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LinkButtonText } from "./CustomLinks";
import moment from "moment";

export default function MenuButton() {
  const [open, setOpen] = useState(false);
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
        <Link to="/timetable" component={LinkButtonText}>
          <p>
            <i className="far fa-calendar-alt"></i> Timetable
          </p>
        </Link>
        <Link to="/schedules" component={LinkButtonText}>
          <p>
            <i className="fas fa-desktop"></i> Your Schedule
          </p>
        </Link>
        <Link to="/rooms" component={LinkButtonText}>
          <p>
            <i className="fas fa-desktop"></i> Rooms
          </p>
        </Link>
        <Link to="/users" component={LinkButtonText}>
          <p>
            <i className="fas fa-users"></i> Users
          </p>
        </Link>
        <p className="copyrightNotice">
          © Linus Bolls {moment().format("YYYY")}
        </p>
      </div>
    </>
  );
}
