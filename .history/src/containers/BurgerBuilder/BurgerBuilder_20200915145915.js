import React, { useState, useEffect, useCallback } from "react";
import Auxic from "../../hoc/Auxic/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControlls";
import Modal from "../../components/UI/Modal/Modal";
import ModalOrderSummary from "../../components/Burger/ModalOrderSummary/ModalOrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/actions/index";
//import { Redirect } from 'react-router-dom';

import { connect, useDispatch, useSelector } from "react-redux";
//import * as actionTypes from '../../store/actions/actionTypes';

const BurgerBuilder = (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  //conditionally displaying modal, Local UI state managment

  const dispatch = useDispatch();
  //dispatch je vec podesen tako da ne recreata funkcije stalno

  const ings = useSelector((state) => {
    debugger;
    return state.burgerBuilderR.ingredients;
  });
  const totPrice = useSelector((state) => state.burgerBuilderR.totalPrice);
  const error = useSelector((state) => state.burgerBuilderR.error);
  const isAuth = useSelector((state) => state.authR.token !== null);
  const building = useSelector((state) => state.burgerBuilderR.building);
  debugger;
  /*
  The useSelector hook takes a selector function to select data from the store and another
   function equalityFn to compare them before returning the results and determine when to render
    if the data from the previous and current state are different.
  */

  const onAddIngredient = (name) =>
    dispatch(actionCreators.addIngredient(name)); //name dolazi iz BuildControls preko ctrl.type

  const onRemoveIngredient = (name) => {
    debugger;
    dispatch(actionCreators.removeIngredient(name));
  };
  const onInitIngredients = useCallback(
    //onInitIngredients ce biti reCreated svaki put kada se re-renderuje ova komponenta
    //tacnije sve ove funkcije ce biti re-creatanje nakon svakog re-renderinga
    () => dispatch(actionCreators.fetchIngredients()),
    [dispatch]
  );

  const onPurchaseInit = () => dispatch(actionCreators.purchaseInit());
   //orderA.js
   //orderR.js vraca purchased na false, da ne bismo bili onemoguceni da udjemo na checkout nakon jedne uspjesne narudzbe

  const onSetAuthRedirectPathBB = (path) =>
    dispatch(actionCreators.setAuthRedirectPath(path)); // bitan je zbog redirektanja nakon sto kliknemo na submit u Auth.js. Mozemo ici nazad na burger ili na checkout.

  //const { onInitIngredients } = props;
  debugger;
  useEffect(() => {
    debugger;
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseButtonEnability = () => {
    //sumOfOfObjectValues.js
    //zbir value-a od svakog ingredienta da li je > 0 radi order buttona
    //Object.values()
    //{bacon: 0, cheese: 0, kecap: 0, meat: 0}
    const sum = Object.keys(ings) //[bacon, cheese, keacap, meat]: Ovo je uradjeno da bi mogao doci do igKeya a to je salad npr. i onda napisati ings[igKey]
      .map((igKey) => {
        return ings[igKey]; //sum = [0, 1, 0, 0, 1]  map pravi novi array na immutable way AllValuesFromObj.js
      })
      .reduce((sum, el) => {
        //0, 1
        return sum + el;
      }, 0);

    return sum > 0;
    //purchaseButtonEnability ce postati true ako je suma veca od 0
  };

  const purchaseHandler = () => {
    //orderNow button/SIGN IN SIGN UP button
    if (isAuth) {
      setModalVisibility(true); //ako smo authenticated: zelimo da vidimo modal, poslije modala da idemo na checkout
    } else {
      onSetAuthRedirectPathBB("/checkoutt"); //ne mozemo kliknuti na button ako nismo bildali. Zelimo da se autentifikujemo pa da idemo na checkout odmah. A ne da opet idemo nazad na bildanje burgera.
      props.history.push("/auth"); //logicno zelimo da se autentifikujemo da bismo mogli poruciti
      //<Redirect to = '/auth'/> ne radi
    }
  };

  const modalCancelHandler = () => {
    setModalVisibility(false);
  };

  const modalContinueHandler = () => {
    onPurchaseInit(); ////setta purchased na false da ne bismo bili onemoguceni da udjemo na checkout
    props.history.push({
      pathname: "/checkoutt", //baca nas sa Modala na Checkout kada kliknemo Continoue
    });
  };

  //LessButtonsDisabling.js
  const lessButtonsEnability = {
    ...ings, //lessButtonsEnability = {kecap: 0, salad: 0, bacon: 0, cheese: 0, meat: 0}
  };

  for (let key in lessButtonsEnability) {
    lessButtonsEnability[key] = lessButtonsEnability[key] <= 0; //lessButtonsEnability = {kecap: true, salad: true, bacon: true, cheese: true, meat: true}
  }

  let burger = error ? (
    <p style={{ textAlign: "center" }}>Sastojci ne mogu biti učitani!</p>
  ) : (
    <Spinner />
  );
  //da bi bio dostupan i izvan bloka, definislali smo ga ovdje vani
  let Modalsummary = null;

  if (ings) {
    //state.ingredients
    burger = (
      <Auxic>
        <Burger ingredients={ings} />

        <BuildControls
          ingredientAdded={onAddIngredient} //addIngredientHandler --> iz buildControls type stize
          ingredientOduzet={onRemoveIngredient} //removeIngredientHandler --> iz buildControls type stize
          disabled={lessButtonsEnability} //lessButtonsEnability = {salad: false, bacon: true, cheese: true, meat: true}
          price={totPrice}
          purchaseButtonEnabled={purchaseButtonEnability()} //purchaseButtonEnability je true ili false (0 ings values)  da nema ove () zagrade, ne bi se nikad okinuo
          purchaseHandler={purchaseHandler} //odlucujemo gdje cemo nakon sto kliknemo order button => na /auth pa na checkout ili na summaryCheckout(modal)
          isAuth={isAuth} //Odlucujemo hoce li pisati ORDER NOW ili SIGN UP TO ORDER na buttonu koji je ispod build controls (MAnje, vise)
        />
      </Auxic>
    );
    Modalsummary = ( //summary je modal koji iskoci kada kada bildamo burger i kada smo vec auth
      <ModalOrderSummary
        ingredients={ings} //state.ingredients
        modalCanceledHandler={modalCancelHandler} //kada se okine nas state postaje modalVisibility: false i modal bjezi sa ekrana
        modalContinueHandler={modalContinueHandler} //kada se okine baca nas sa modala na checkout
        summaryCijena={totPrice}
      />
    );
  }

  /*if (loading) {
    summary = <Spinner />;
  } */

  return (
    <Auxic>
      <Modal
        show={modalVisibility} //ako je true, modal ce biti vidljiv
        modalClosed={modalCancelHandler}
      >
        {Modalsummary /*summary je modal ili spinner, children u modal-u */}
      </Modal>
      {burger} {/* burger je <p> ili Spinner ili hambas + buildcontrols */}
    </Auxic>
  );
};
export default BurgerBuilder;

//1. konfiguracija
//subscription

/*const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilderR.ingredients,
    totPrice: state.burgerBuilderR.totalPrice,
    error: state.burgerBuilderR.error,
    isAuth: state.authR.token !== null,
    building: state.burgerBuilderR.building,
  };
};*/

//2. konfiguracija

//Akcije salju podatke na reducer.js
//Salju mu type i ostale propertije(optional)

/*const mapDispatchToProps = (dispatch) => {
  return {
    //onAddIngredient: (name) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: name, val: actionTypes.INGREDIENT_PRICE[name]}), //ovo name iz BuildControls stize, a val iz actions.js

    //payload mora iamti isto ime u reduceru i u akciji ovdje, val sluzi za updajtovanje cijene
    //onRemoveIngredient: (name) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: name, val: actionTypes.INGREDIENT_PRICE[name]}), //ovo name iz BuildControls stize, a val iz actions.js

    //payload mora iamti isto ime u reduceru i u akciji ovdje
    //onDeleteResult: (idAAA) => dispatch(actionCreators.deleteResult(idAAA))

    onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)), //name dolazi iz BuildControls preko ctrl.type

    onRemoveIngredient: (name) =>
      dispatch(actionCreators.removeIngredient(name)),

    onInitIngredients: () => dispatch(actionCreators.fetchIngredients()),

    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),

    onSetAuthRedirectPathBB: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)), // bitan je zbog redirektanja nakon sto kliknemo na submit u Auth.js. Mozemo ici nazad na burger ili na checkout.
  };
};*/

/*const mapDispatchToProps = {
  onAddIngredient: actionCreators.addIngredient,
  onRemoveIngredient: actionCreators.removeIngredient,
  onInitIngredients: actionCreators.fetchIngredients,
  onPurchaseInit: actionCreators.purchaseInit,
  onSetAuthRedirectPathBB: actionCreators.setAuthRedirectPath,
};*/
/*
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios)); //axios za withErrorHandler HOC
*/
