import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { logout, newBreakpointListener } from "../event";
import {
  LinkButtonText,
  LinkButtonIcon,
  LinkStatistaLogo,
} from "./CustomLinks";
import MenuButton from "./FlyoutMenu";

export default function Header(props: any) {
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
