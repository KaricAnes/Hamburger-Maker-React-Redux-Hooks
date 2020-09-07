import React, { useState } from "react";

import Auxic from "../Auxic/Auxilary";

import classes from "./Layout.module.css";

import Toolbar from "../../components/Navigation/ToolBar/ToolBar";

import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = () => {
    /*const doesShow = this.state.showSideDrawer;
        this.setState({showSideDrawer: !doesShow});*/

    /* this.setState({showSideDrawer: !this.state.showSideDrawer});   Ovaj moze izazvati nuspojave*/

    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  return (
    <Auxic>
      <Toolbar
        isAuth={props.isAuthenticated}
        klik2={this.toggleSideDrawerHandler}
      />

      <SideDrawer
        isAuth={props.isAuthenticated}
        show={state.showSideDrawer}
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
  };
};

export default connect(mapStateToProps, null)(Layout);
