import React from "react";
import classes from "./Modal.module.css";
import Auxic from "../../../hoc/Auxic/Auxilary";
import Bacdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Auxic>
      <Bacdrop show={props.show} clicked={props.modalClosed} />

      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-110vh)",
          
        }}
      >
        {props.children}
      </div>
    </Auxic>
  );
};

export default Modal;
