import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxic from "../Auxic/Auxilary";
import useHttpErrorHandler from '.'

//Funkcija koja prihvata wrappedComponent kao input
//a koja vraca funkciju koja prima propsa onda vraca naravno JSX
//axios nam treba da bismo mogli postaviti globalni errorHandler

//cijelu ovu komponentu mozemo pretvoriti u customHook koja ce nam nakon svakog httpa requesta
//javljati da li imamo error ili nemamo
//a onda mi mozemo odluciti u toj komponenti u kojoj koristimo taj hook sta zelimo da uradimo
//Ne moramo da prikazemo modal, mozemo da uradimo sta god zelimo

const witErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    /*Ovaj error je iz firebasea, to je ustvari objekat koji sadrzi error message */
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    //zamjena za componentWillUnmount
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Auxic>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>

        <WrappedComponent {...props} />
      </Auxic>
    );
  };
};

export default witErrorHandler;
