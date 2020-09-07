import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxic from "../Auxic/Auxilary";
import useHttpErrorHandler from "../../components/customHooks/httpErrorHandler";

//Funkcija koja prihvata wrappedComponent kao input
//a koja vraca funkciju koja prima propsa onda vraca naravno JSX
//axios nam treba da bismo mogli postaviti globalni errorHandler

//cijelu ovu komponentu mozemo pretvoriti u customHook koja ce nam nakon svakog httpa requesta
//javljati da li imamo error ili nemamo
//a onda mi mozemo odluciti u toj komponenti u kojoj koristimo taj hook sta zelimo da uradimo
//Ne moramo da prikazemo modal, mozemo da uradimo sta god zelimo

const witErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler();

    return (
      <Auxic>
        <Modal show={error} modalClosed={cl}>
          {error ? error.message : null}
        </Modal>

        <WrappedComponent {...props} />
      </Auxic>
    );
  };
};

export default witErrorHandler;
