import React from "react";

import classes from "./Backdrop.module.css";

const backdrop = (props) =>
  /*
backrop se koristi na dva mejsta, kada kliknemo na haburger menu na manjim ekranima 
backrop se tada vidi u pozadini -  kada kliknemo na njega on se povuce
*/

  /*
backrop koristimo i sa modalom, kada nam iskoci modal u pozadini se pojavi backdrop
kada kliknemo na tu pozadinu - backdrop nestane
 */
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
