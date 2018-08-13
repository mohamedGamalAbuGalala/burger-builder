import React from "react";

import classes from "./Backdrop.css";

const BackDrop = props => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;
};

export default BackDrop;
