import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  <header className={classes.ToolBar}>
    <DrawerToggle klik2={props.klik2} />{" "}
    {/*Tri linije - hambas na manjim ekranima*/}
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      
    </nav>
  </header>
);

export default toolbar;
