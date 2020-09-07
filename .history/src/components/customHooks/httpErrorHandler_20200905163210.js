import { useState, useEffect } from "react";

export default function httpErrorHandler() {
  return <div></div>;
}
export default (httpErrorHandler) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpErrorHandler.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  /*Ovaj error je iz firebasea, to je ustvari objekat koji sadrzi error message */
  const resInterceptor = httpErrorHandler.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  //zamjena za componentWillUnmount
  useEffect(() => {
    return () => {
      httpErrorHandler.interceptors.request.eject(reqInterceptor);
      httpErrorHandler.interceptors.response.eject(resInterceptor);
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
  return [error, errorConfirmedHandler]
};
