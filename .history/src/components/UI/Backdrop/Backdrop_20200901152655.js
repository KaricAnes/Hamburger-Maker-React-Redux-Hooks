import React from "react";

import classes from "./Backdrop.module.css";

const backdrop = (props) =>
/*
backrop se koristi na dva mejsta, kada kliknemo na haburger

*/
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
