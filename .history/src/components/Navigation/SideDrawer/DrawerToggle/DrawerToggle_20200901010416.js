import React from "react";
import classes from "./DrawerToggle.module.css";

const drawerToggle = (props) => (
    //ovo su tri 
  <div className={classes.DrawerToggle} onClick={props.klik2}>
    
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
