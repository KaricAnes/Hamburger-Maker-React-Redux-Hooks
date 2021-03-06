import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

const Logout = (props) {
  //Ako user klikne na LogOut button u NAvigationITems, bit cemo baceni na ovu komponenetu koja ce nas odlogovati i vratiti na pocetnu
  componentDidMount() {
    this.props.onLogout(); //mogao sam ovdje poslati (this.props.history) i imao ih push opciju
  }

  render() {
    //debugger;
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  //debugger;
  return {
    onLogout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
