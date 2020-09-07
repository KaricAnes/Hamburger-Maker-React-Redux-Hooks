import React, { useState, useEffect } from "react";
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

import { connect } from "react-redux";
//import * as actionTypes from '../../store/actions/actionTypes';

const BurgerBuilder = (props) => {
  const [porucljivo, setPorucljivo] = useState(false); ///*Poruci Button */,
  const [modalVisibility, setModalVisibility] = useState(false);
  //conditionally displaying modal, Local UI state managment

  //sada se logika ovog koda ispod nalazi u burgerBuilderA.js-- u actionCreatoru

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const purchaseButtonEnability = () => {
    //sumOfOfObjectValues.js
    //zbir value-a od svakog ingredienta da li je > 0 radi order buttona
    //Object.values()
    const { ings } = props; //{bacon: 0, cheese: 0, kecap: 0, meat: 0}
    const sum = Object.keys(ings) //[bacon, cheese, keacap, meat]: Ovo je uradjeno da bi mogao doci do igKeya a to je salad npr. i onda napisati ings[igKey]
      .map((igKey) => {
        //debugger;
        return ings[igKey]; //sum = [0, 1, 0, 0, 1]  map pravi novi array na immutable way AllValuesFromObj.js
      })
      .reduce((sum, el) => {
        //0, 1
        return sum + el;
      }, 0);

    return sum > 0;
    //porucljivo ce postati true ako je suma veca od 0
  };

  const purchaseHandler = () => {
    //orderNow button/SIGN IN SIGN UP button
    if (props.isAuth) {
      setModalVisibility(true); //ako smo authenticated: zelimo da vidimo modal, poslije modala da idemo na checkout
    } else {
      props.onSetAuthRedirectPathBB("/checkoutt"); //ne mozemo kliknuti na button ako nismo bildali. Zelimo da se autentifikujemo pa da idemo na checkout odmah. A ne da opet idemo nazad na bildanje burgera.
      props.history.push("/auth"); //logicno zelimo da se autentifikujemo da bismo mogli poruciti
      //<Redirect to = '/auth'/> ne radi
    }
  };

  const modalCancelHandler = () => {
    setModalVisibility(false);
  };

  const modalContinueHandler = () => {
    props.onPurchaseInit(); ////setta purchased na false da ne bismo bili onemoguceni da udjemo na checkout
    props.history.push({
      pathname: "/checkoutt", //baca nas sa Modala na Checkout kada kliknemo Continoue
    });
  };

  //LessButtonsDisabling.js
  const lessButtonsEnability = {
    ...props.ings,
  };

  for (let key in lessButtonsEnability) {
    lessButtonsEnability[key] = lessButtonsEnability[key] <= 0; //ako je {salad: 0} onda ce biti {salad:true, meat: false...} overriding, bit ce dakle disabled
    //lessButtonsEnability = {salad: false, bacon: true, cheese: true, meat: true}
  }

  let burger = props.error ? (
    <p style={{ textAlign: "center" }}>Sastojci ne mogu biti učitani!</p>
  ) : (
    <Spinner />
  );

  let summary = null;

  if (props.ings) {
    //state.ingredients
    burger = (
      <Auxic>
        <Burger ingredients={props.ings} />

        <BuildControls
          ingredientAdded={props.onAddIngredient} //addIngredientHandler --> iz buildControls type stize
          ingredientOduzet={props.onRemoveIngredient} //removeIngredientHandler --> iz buildControls type stize
          disabled={lessButtonsEnability} //lessButtonsEnability = {salad: false, bacon: true, cheese: true, meat: true}
          price={props.totPrice}
          purchaseButtonEnabled={purchaseButtonEnability()} //porucljivo je true ili false (0 ings values)  da nema ove () zagrade, ne bi se nikad okinuo
          purchaseHandler={purchaseHandler} //odlucujemo gdje cemo nakon sto kliknemo order button => na /auth pa na checkout ili na summaryCheckout(modal)
          isAuth={props.isAuth} //Odlucujemo hoce li pisati ORDER NOW ili SIGN UP TO ORDER na buttonu koji je ispod build controls (MAnje, vise)
        />
      </Auxic>
    );
    summary = ( //summary je modal koji iskoci kada kada bildamo burger i kada smo vec auth
      <ModalOrderSummary
        ingredients={props.ings} //state.ingredients
        modalCanceledHandler={modalCancelHandler} //kada se okine nas state postaje modalVisibility: false i modal bjezi sa ekrana
        modalContinueHandler={modalContinueHandler} //kada se okine baca nas sa modala na checkout
        summaryCijena={props.totPrice}
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
        {summary /*summary je modal ili spinner, children u modal-u */}
      </Modal>
      {burger} {/* burger je < hambas, buildcontrols */}
    </Auxic>
  );
};

//1. konfiguracija
//subscription

const mapStateToProps = (state) => {
  ////debugger;
  return {
    ings: state.burgerBuilderR.ingredients,
    totPrice: state.burgerBuilderR.totalPrice,
    error: state.burgerBuilderR.error,
    isAuth: state.authR.token !== null,
    building: state.burgerBuilderR.building,
  };
};

//2. konfiguracija

//Akcije salju podatke na reducer.js
//Salju mu type i ostale propertije(optional)

const mapDispatchToProps = (dispatch) => {
  ////debugger;
  return {
    //returnat cemo JS objekat u kojem mozemo definisati neke prop names
    //koji ce cuvati u sebi reference to a function koja ce biti executana da izvrsi action
    //Mozemo izabraty prop name po zelji
    //sada ovaj prop cuva value, a taj value treba da bude anonymus function
    //ova funkcija ce od sada biti dostupna preko ovog prop name-a: onIncrementCounter
    //Mi sada ovu prop: onIncrementCounter mozemo vezati npr. za onClick() neki. I kada god kliknemo na
    //njega, ova dispatch funkcija ce se okinuti.
    //ovo type imam objasnjeno u redux-basics.js
    //Sa typom sam dobio property increment npr., koji mugu koristiti i usvom containeru
    //Tacnije, to cumoci uraditi kada proslijedim ovu funkciju kao 2. argument u connect

    /*onIncrementCounter: ()=> dispatch({type: actionTypes.INCREMENT}),
  onDecrementCounter: ()=> dispatch({type: actionTypes.DECREMENT}),
  onSubCounter: ()=> dispatch({type: actionTypes.SUB, val:15}), 
  
  //Cesto se koristi payload umjesto ovog val. Mozemo imati koliko god zelim propertya poered typa
  //Ovom valu pristupamo preko action.val u reducer.js-u
  onAddCounter: ()=> dispatch({type: actionTypes.ADD, val: 10}),*/

    //value u payloadu bi trebala biti trenutna vrijednost Countera
    //payload nismo morali slati jer imamo vec u reduceru state i u njemu counter
    //ovo name se mora slagati sa name-om u reduceru u dijelu vezanom za ovu akciju

    //name, age, idAAA su isti. Samo sto su age i name stigli iz AddPErson komponente, a idAAA iz ove Persons.js. Oba su ovdje proslijedjena
    //preko funkcija koje se nalaze iznad. Samo su podaci u njima drugacije malo rasporedjeni. name, i age su definisani preko localState-a.
    //Zato sto nisu bili toliko bitni ovdje.

    //1) addIngredientHandler() i
    //2) removeIngredientHandler() ne postoje vise

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
};

/*const mapDispatchToProps = {
  onAddIngredient: actionCreators.addIngredient,
  onRemoveIngredient: actionCreators.removeIngredient,
  onInitIngredients: actionCreators.fetchIngredients,
  onPurchaseInit: actionCreators.purchaseInit,
  onSetAuthRedirectPathBB: actionCreators.setAuthRedirectPath,
};*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios)); //axios za withErrorHandler HOC
