import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  /*
  //Toolbar postoji i na manjim i na vecim ekranima
  //na manjim ekranima ce se vidjeti toolbar ali nece navigation items
  //css klasa pozvana u nav u ovom dokumentu
  @media (max-width: 499px) {
  
  .DesktopOnly {
    display: none;
  }
}*/

  <header className={classes.ToolBar}>
    <DrawerToggle klik2={props.klik2} />{" "}
    {/*Tri linije - hambas na manjim ekranima
    DrawerToggle.css iznad 500px dipslay none*/}
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
