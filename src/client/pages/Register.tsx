import React from "react";
import { Link } from "../components/CustomLinks";
import Input from "../components/Input";
import { input } from "../../shared/validate";
import axios from "axios";

export default function RegisterPage() {
  const register = () => {
    const emailField: any = document.getElementById("Email");
    const passwordField: any = document.getElementById("Password");
    const firstNameField: any = document.getElementById("First Name");
    const lastNameField: any = document.getElementById("Last Name");
    const output: any = document.getElementById("output");
    axios
      .post(
        "/api/register",
        {
          data: {
            email: emailField.value,
            password: passwordField.value,
            firstName: firstNameField.value,
            lastName: lastNameField.value,
          },
        },
        {}
      )
      .then((res: any) => {
        if (res.data.data) output.innerHTML = res.data.data;
        else if (res.data.success) {
          output.innerHTML = `Success! Please confirm your email using the link we just sent you.`;
        } else {
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
        Register
        <Link to="/login" className="button long invis text">
          Already a user?
        </Link>
      </div>
      <p id="output"></p>
      <Input label="Email" inputType={input.user.email} />
      <Input label="Password" inputType={input.user.password} />
      <Input label="First Name" inputType={input.user.firstName} />
      <Input label="Last Name" inputType={input.user.lastName} />
      <button className="button panel__button long cta0" onClick={register}>
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
    </div>
  );
}
