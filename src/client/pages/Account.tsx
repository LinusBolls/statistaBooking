import React from "react";
import { logout } from "../event";
import { LinkButtonText } from "../components/CustomLinks";
import { Link } from "react-router-dom";

export default function AccountPage({ user }: any) {
  if (!user)
    return (
      <div>
        <Link to="/login" component={LinkButtonText}>
          Log in
        </Link>
        to view account info
      </div>
    );

  const content = Object.entries(user).map(entry => {
    const [key, value] = entry;
    return (
      <div>
        <div>{key}</div>
        <div>{value as string}</div>
      </div>
    );
  });
  return (
    <>
      <h1>{user.firstName + " " + user.lastName}</h1>
      <div>{content}</div>
      <button className="button long invis text" onClick={logout}>
        Log out
      </button>
    </>
  );
}
