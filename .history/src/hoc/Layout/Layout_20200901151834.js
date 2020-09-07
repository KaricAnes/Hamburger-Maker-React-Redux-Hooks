import React, { useState } from "react";

import Auxic from "../Auxic/Auxilary";

import classes from "./Layout.module.css";

import Toolbar from "../../components/Navigation/ToolBar/ToolBar";

import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  /*state = {
    showSideDrawer: false,
  };*/

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const toggleSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);

    /*this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });*/
  };

  return (
    <Auxic>
      <Toolbar isAuth={props.isAuthenticated} klik2={toggleSideDrawerHandler} />

      <SideDrawer
        isAuth={props.isAuthenticated}
        show={showSideDrawer}
        klik={sideDrawerClosedHandler}
      />

      <main className={classes.Content}>{props.children}</main>
    </Auxic>
  );
};

//subscription
//1. konfiguracija
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authR.token !== null,
    //poslano u navigationItems
  };
};

export default connect(mapStateToProps, null)(Layout);
