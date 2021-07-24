import React, { useState } from "react";
import { validate, input } from "../../shared/validate";

function Input(props: any) {
  const [isValid, setIsValid] = useState(true);
  async function check() {
    const el: any = document.getElementById(props.label);
    const validCheck: any = await validate(
      { value: el.value },
      { value: [...props.inputType, "required"] }
    );
    setIsValid(validCheck.success);
  }
  return (
    <div className="inpat">
      <input
        id={props.label}
        className={"inpat__input" + (isValid ? "" : " inpat__input--invalid")}
        type={props.inputType === input.user.password ? "password" : "text"}
        required
        onKeyUp={props.inputType && check}
        tabIndex={0}
      />
      <label htmlFor={props.label} className="inpat__label">
        {props.label}
      </label>
      {/*
      <div className="button inpat__trailIcon square invis">
        {isValid ? "(y)" : "(n)"}
      </div>
      */}
    </div>
  );
}
export default Input;
