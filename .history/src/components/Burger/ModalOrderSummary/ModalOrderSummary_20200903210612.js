import React from "react";
import Auxic from "../../../hoc/Auxic/Auxilary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  //Ovo je modal

  //ovaj fazon sam objasnio u arrayMethod.js
  //ovaj fazon je koristen i za porucivanje button da zbrojimo da li su values od ings-a veci od nula pa da
  //disablamo order button
  //morao sam Object.keys zato sto map ne moze na obj da se udari, a obj.keys pretvara obj u array
  //klasican nacin prikazivanja 
  const ingredientSumamry = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Auxic>
      <h3>Tvoja Narudzba</h3>
      <p>Ukusni hamburger sa sljedećim sastojcima:</p>

      <ul>{ingredientSumamry}</ul>
      <p>
        <strong>
          Cijena vase narudzbe je: {props.summaryCijena.toFixed(2)} KM
        </strong>
      </p>
      <p>Continue to Checkout?</p>

      <Button btntype="Danger" clicked={props.modalCanceledHandler}>
        ODUSTANI
      </Button>
      <Button btntype="Success" clicked={props.modalContinueHandler}>
        NASTAVI
      </Button>
    </Auxic>
  );
};

export default OrderSummary;
