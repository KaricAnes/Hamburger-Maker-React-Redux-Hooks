import React, { Component } from "react";
import Auxic from "../../../hoc/Auxic/Auxilary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //Ovo je modal

  render() {
    //ovaj fazon sam objasnio u arrayMethod.js
    //ovaj fazon je koristen i za porucivanje button da zbrojimo da li su values od ings-a veci od nula pa da
    //disablamo order button
    //morao sam Object.keys zato sto map ne moze na obj da se udari, a obj.keys pretvara obj u array
    const ingredientSumamry = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

for (let key in this.props.ingredients){
  const ingredientSumamry = 
}

    return (
      <Auxic>
        <h3>Tvoja Narudzba</h3>
        <p>Ukusni hamburger sa sljedećim sastojcima:</p>

        <ul>{ingredientSumamry}</ul>
        <p>
          <strong>
            Cijena vase narudzbe je: {this.props.summaryCijena.toFixed(2)} KM
          </strong>
        </p>
        <p>Continue to Checkout?</p>

        <Button btntype="Danger" clicked={this.props.modalCanceledHandler}>
          ODUSTANI
        </Button>
        <Button btntype="Success" clicked={this.props.modalContinueHandler}>
          NASTAVI
        </Button>
      </Auxic>
    );
  }
}

export default OrderSummary;
