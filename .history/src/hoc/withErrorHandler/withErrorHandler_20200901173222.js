import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxic from "../Auxic/Auxilary";

//Funkcija koja prihvata wrappedComponent kao input
//a koja vraca funkciju koja prima propsa onda vraca naravno JSX
//axios nam treba da bismo mogli postaviti globalni errorHandler

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
      this.setState({ error: null });
    };

    return (
      <Auxic>
        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
          {this.state.error ? this.state.error.message : null}>
        </Modal>

        <WrappedComponent {...this.props} />
      </Auxic>
    );
  };
};

export default witErrorHandler;
