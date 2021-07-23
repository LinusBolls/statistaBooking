import React, { useEffect, useState } from "react";
import AccountInfo from "./AccountInfo";
import { newBreakpointListener, Event } from "../event";
import { Link } from "./CustomLinks";
import MenuButton from "./FlyoutMenu";
import { useHistory } from "react-router-dom";

export default function Header({ user }: any) {
  const [initialBreakpoint, breakpointListener] = newBreakpointListener();
  const [viewport, setViewport] = useState(initialBreakpoint);
  breakpointListener((width: number) => setViewport(width));

  const history = useHistory();

  useEffect(() => {
    window.addEventListener(Event.LOGIN, (e: any) =>
      history.push(e.detail == null ? "/login" : "/")
    );
  }, []);
  return (
    <div className="header header--pageTop">
      <MenuButton user={user} />
      <Link
        to="/"
        style={
          viewport >= 600
            ? {
                height: "100%",
                display: "flex",
                alignItems: "center",
                marginRight: "auto",
                paddingLeft: "1rem",
              }
            : {
                height: "100%",
                display: "flex",
                alignItems: "center",
                margin: "auto",
              }
        }
      >
        <img src="/statistaLogoWhite.svg" alt="Statista" height="45%" />
      </Link>
      {viewport >= 600 && user ? (
        <Link to="/timetable" className="button long invis icon">
          <i className="far fa-calendar-alt"></i>
        </Link>
      ) : (
        ""
      )}
      <AccountInfo user={user} isWideMode={viewport >= 600} />
    </div>
  );
}
