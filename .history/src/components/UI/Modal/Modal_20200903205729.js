import React, { useEffect } from "react";
import classes from "./Modal.module.css";
import Auxic from "../../../hoc/Auxic/Auxilary";
import Bacdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  /*Ovo ispod se treba updajtovati, samo kada je show state promijenjeno*/

  return (
    <Auxic>
      <Bacdrop show={props.show} clicked={props.modalClosed} />

      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-110vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Auxic>
  );
};

export default Modal;
