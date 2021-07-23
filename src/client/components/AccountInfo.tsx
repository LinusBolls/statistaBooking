import React from "react";
import { logout } from "../event";
import { Link } from "./CustomLinks";

export default function AccountInfo({ user, isWideMode = true, ...rest }: any) {
  const desktopView = user ? (
    <>
      <Link to="/account" className="button invis long text">
        {user.firstName + " " + user.lastName}
      </Link>
      <Link to="/logout" className="button invis square icon">
        <i className="fas fa-sign-out-alt"></i>
      </Link>
    </>
  ) : (
    <>
      <Link to="/register" className="button invis long text">
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
      {...rest}
    >
      <Link
        to={user ? "/account" : "/login"}
        className="button invis square icon"
      >
        <i className={user ? "far fa-user-circle" : "fas fa-sign-in-alt"} />
      </Link>
      {isWideMode ? desktopView : ""}
    </div>
  );
}
