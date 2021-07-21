import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LinkButtonText,
  LinkButtonIcon,
  LinkStatistaLogo,
} from "./CustomLinks";
import moment from "moment";
import { logout, newBreakpointListener } from "../event";

function MenuButton() {
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
function Header(props: any) {
  return (
    <div className="header header--pageTop">
      <MenuButton />
      <Link to="/home" component={LinkStatistaLogo} />
      <AccountInfo user={props.user} />
    </div>
  );
}
function AccountInfo({ user }: any) {
  const [initialBreakpoint, breakpointListener] = newBreakpointListener();
  const [viewport, setViewport] = useState(initialBreakpoint);
  breakpointListener((width: number) => setViewport(width));

  const desktopView = user ? (
    <>
      <Link to="/account" component={LinkButtonText}>
        {user.firstName + " " + user.lastName}
      </Link>
      <button className="button long invis icon" onClick={logout}>
        <i className="fas fa-sign-out-alt"></i>
      </button>
      <Link to="/timetable" component={LinkButtonIcon}>
        <i className="far fa-calendar-alt"></i>
      </Link>
    </>
  ) : (
    <>
      <Link to="/register" component={LinkButtonText}>
        Register
      </Link>
    </>
  );
  return (
    <div
      className="accountInfo"
      style={{
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Link to={user ? "/account" : "/login"} component={LinkButtonIcon}>
        {user ? (
          <>
            <i className="far fa-user-circle"></i>
          </>
        ) : (
          <i className="fas fa-sign-in-alt"></i>
        )}
      </Link>
      {viewport >= 600 ? desktopView : ""}
    </div>
  );
}
export default Header;
