import React from "react";
import { logout } from "../event";
import { Link } from "../components/CustomLinks";

export default function AccountPage({ user }: any) {
  if (!user)
    return (
      <div>
        <Link to="/login" className="button long invis text">
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
      <Link to="/logout" className="button long invis text">
        Log out
      </Link>
    </>
  );
}
