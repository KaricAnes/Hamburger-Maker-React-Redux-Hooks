import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxic from "../../../hoc/Auxic/Auxilary";

const sideDrawer = (props) => {
  /*
  ovdje smo definisali kako ce se zastor otvarati i zatvorati preko css klasa
  attachedClasses je 
  */

  let attachedClasses = [classes.SideDrawer, classes.Closed];

  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  /*
props.klik zatvara zastor na manjim ekranima 
tu funkciju smo definisali na dva mjesta a to su 
1) div u ovom fajlu  - kada kliknemo na sam zastor (bijelo u kojem imamo navigationItems) 
i backdrop kada kliknemo na zatamnjeno
*/
  return (
    <Auxic>
      <Backdrop show={props.show} clicked={props.klik} />

      <div className={attachedClasses.join(" ")} onClick={props.klik}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Auxic>
  );
};

export default sideDrawer;
