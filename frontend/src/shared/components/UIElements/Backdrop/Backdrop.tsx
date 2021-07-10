import React from "react";

import "./Backdrop.css";

export interface IBackdrop {
  onClick: () => void;
}

const Backdrop = (props: IBackdrop) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

export default Backdrop;
