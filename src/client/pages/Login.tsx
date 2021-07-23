import React from "react";
import Input from "../components/Input";
import { input } from "../../shared/validate";
import { Link } from "../components/CustomLinks";
import axios from "axios";

import { loginEvent, fireLoginEvent } from "../event";

export default function LoginPage(props: any) {
  const login = () => {
    const emailField: any = document.getElementById("Email");
    const passwordField: any = document.getElementById("Password");
    const output: any = document.getElementById("output");
    axios
      .post(
        "/api/login",
        {
          data: {
            email: emailField.value,
            password: passwordField.value,
          },
        },
        {}
      )
      .then((res: any) => {
        if (res.data.data) fireLoginEvent(res.data.data as loginEvent);
        else {
          if (typeof res.data.reason === "string") {
            output.innerHTML = res.data.reason;
            return;
          }
          output.innerHTML = res.data.reason.reduce(
            (str: any, error: any) => str + `<p>${error}</p>`,
            ""
          );
        }
      })
      .catch(e => (output.innerHTML = e));
  };
  return (
    <div className="panel">
      <div className="header panel__header">
        Log in
        <Link to="/register" className="button long invis text">
          Not a user yet?
        </Link>
        {/*
        <button className="button invis square icon">
          <i className="fas fa-info-circle"></i>
        </button>*/}
      </div>
      <p id="output"></p>
      <Input label="Email" inputType={input.user.email} />
      <Input label="Password" inputType={input.user.password} />
      <button className="button panel__button long cta0" onClick={login}>
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
    </div>
  );
}
