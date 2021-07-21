import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fireLoginEvent } from "../event";
import { LinkButtonText } from "../components/CustomLinks";

export default function MailConfirmPage() {
  const { token } = useParams() as any;
  const data = token.split("||");
  const ding = {
    token: data[0],
    isFirstLogin: true,
    userInfo: JSON.parse(decodeURIComponent(data[1])),
  };
  fireLoginEvent("Moin");
  /*
  useEffect(() => {
    const { token } = useParams() as any;
    const data = token.split("||");
    fireLoginEvent({
      token: data[0],
      isFirstLogin: true,
      userInfo: JSON.parse(decodeURIComponent(data[1])),
    });
  }, []);
  */
  return (
    <div>
      <h1>Success!</h1>
      <p>Your account has been activated.</p>
      <Link to="/login" component={LinkButtonText}>
        Log in
      </Link>
    </div>
  );
}
