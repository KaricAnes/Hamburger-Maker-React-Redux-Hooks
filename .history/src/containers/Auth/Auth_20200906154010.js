import React, { useState, useEffect } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actionCreatorsAuth from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Adresa",
      },
      value: "",
      validation: {
        //rules for validation
        required: true,
        //isEmail: true, //ako bude errora neplanskih do njega je
      },
      valid: false,
      touched: false, //onChange() postaje true
    },

    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Šifra",
      },
      value: "",
      validation: {
        //rules for validation
        required: true,
        isEmail: true, //ako bude errora neplanskih do njega je
        minLength: 6, // na firebase-u je minimum 6 karaktera
      },
      valid: false,
      touched: false, //kada god se okine inputChangedHandler touched ce biti true
    },
  });
  const [isSignUp, setIsSignUp] = useState(true); //actionCreatorsAuth.auth(email, password, isSignUp)

  //pomocu ovog ispod resetamo path/url svaki put kada dodjemo do auth page a da nismo nabildali burger prethodno

  useEffect(() => {
    if (!props.building && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath("/");
    }
  }, []);

  let d

  const checkValidity = (value, rules) => {
    //debugger;
    let isValid = true;
    //morao sam settati na true jer ne bi proslo ovu prvu

    if (rules.required) {
      //debugger;
      isValid = value.trim() !== "" && isValid;
      //isValid ce postati true ako trimmied value nije jednaka praznom stringu
      //trim() uklanja white spaces na pocetku i na kraju
      //isValid vraca true ili false
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid; //true ili false
  };

  //inputChangedHandler malo drugaciji od onog u ContactData.js kontejneru

  const inputChangedHandler = (event, controlName) => {
    //inputChangedHandler(event, formElement.id)
    //debugger;
    const updatedControls = {
      ...controls,

      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true, //kada god se okine inputChangedHandler touched ce biti true
      },
    };
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault(); //prevent reloading page

    props.onAuth(
      controls.email.value, //email
      controls.password.value, //password
      isSignUp //bitan nam je zbog urla-a u  AuthA.js (auth action) koji moze biti SIGNIN ili SIGNUP i dole sta ce pisati na buttonu
    );
    //debugger;
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  // Moramo objeakt iz state-a pretvoriti u array da bi smo mogli loopati kroz njega
  //naravno napravili smo prazan array
  //debugger;
  const formElementsArray = []; //[{config: {elementType: "input", elementConfig: {…}, value: "", validation: {…}, valid: false, …} id: "email"}, {noviObj}]
  //debugger;
  for (let key in controls) {
    //debugger;
    //key je email, password, ...
    formElementsArray.push({
      //novi objekat cemo pushati, ne stari
      id: key,
      //elementConfig: key.elementConfig,
      config: controls[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id} //iz ovog gore arraya iznad
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      //posaljemo invalid samo ako je true
      invalid={!formElement.config.valid}
      //Ako nije settana validacija shouldValidate ce biti false /rules
      shouldValidate={formElement.config.validation}
      //shouldValidate varaca true ili false u zavisnosti da li je postavljen validation
      //za dropDown on nije postavljen
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let authRedirect = null;

  if (props.isAuth) {
    //ukoliko smo se ulogovali, idemo na '/checkout' ili '/'. u zavisnosti da li smo vec bili ulogovani ili
    // smo prvo bildali nasu aplikaciju pa se onda ulogovali
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p style={{ color: "red" }}>{props.error.message}</p>;
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      {authRedirect}

      <form onSubmit={submitHandler}>
        {form}
        <Button btntype="Success">SUBMIT</Button>
      </form>

      <Button clicked={switchAuthModeHandler} btntype="Danger">
        SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  //debugger;
  return {
    loading: state.authR.loading, //if (this.props.loading) { form = Spinner }
    error: state.authR.error,
    isAuth: state.authR.token !== null, //ukolikoje isAuth: true, idemo na '/checkout' ili '/'. u zavisnosti da li smo vec bili ulogovani ili smo prvo bildali nasu aplikaciju pa se onda ulogovali
    building: state.burgerBuilderR.building,
    authRedirectPath: state.authR.authRedirectPath,
  };
};

const mapDipatchToProps = (dispatch) => {
  //debugger;
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreatorsAuth.auth(email, password, isSignUp)), // nas actionCreator auth ocekuje tri argumenta
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreatorsAuth.setAuthRedirectPath(path)),

    //onAuth zelimo da okinemo kada god kliknemo na button submit
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(Auth);
