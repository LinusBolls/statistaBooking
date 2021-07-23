import React, { forwardRef } from "react";
import { useHistory } from "react-router-dom";

const Link = ({ to, children, className, ...rest }: any) => {
  const history = useHistory();
  return (
    <a
      onClick={() => history.push(to)}
      className={"pageLink " + (className || "")}
      {...rest}
    >
      {children}
    </a>
  );
};
const newCustomLink = (defaultClassName: string) =>
  forwardRef((props: any, ref) => {
    const { navigate, className, ...rest } = props;
    return (
      <a {...rest} className="pageLink">
        <button {...(className || { className: defaultClassName })}>
          {props.children}
        </button>
      </a>
    );
  });
const LinkButtonText = newCustomLink("button long invis text");
const LinkButtonIcon = newCustomLink("button square invis icon");

const LinkStatistaLogo = forwardRef((props: any, ref) => {
  const { navigate, ...rest } = props;
  return (
    <a
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <img src="/statistaLogoWhite.svg" alt="Statista" height="45%" />
    </a>
  );
});
export { LinkButtonText, LinkButtonIcon, LinkStatistaLogo, Link };
