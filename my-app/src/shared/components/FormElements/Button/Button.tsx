import { LocationDescriptor, Location } from "history";
import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

export interface IButton {
  href?: string;
  size?: any;
  inverse?: any;
  danger?: any;
  children: {} | null | undefined;
  to?:
    | LocationDescriptor<unknown>
    | ((location: Location<unknown>) => LocationDescriptor<unknown>);
  exact?: Boolean;
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
}

const Button = (props: IButton) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
