import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  //ova komponenta je jedan cijel order dakle jedna cijela kocka u  /orderss

  //transformisanje objekta ingredients u array
  //mogli smo korsititi istu logiku kau u Burger.js-u
  //Ali cemo raditi alternativni nacin
  //
  const ingredients = [];
  //console.log(ingredients);    //[{name: bacon, value: 0}, {name:cheese,  value:0}, {name: meat, value: 1}, {name:salad,  value:0}], {sve naruddzbe tako}]
  debugger;
  for (let ingredientName in props.ingredients) {
    //debugger;

    //{bacon: 0, cheese: 0, meat: 0, salad: 1} => props.ingredients
    //console.log('props.ingredients[ingredientName]: ' + props.ingredients[ingredientName]);
    ingredients.push({
      name: ingredientName,
      value: props.ingredients[ingredientName],
    });
    //props.ingredients[ingredientName]   value: 1 2 ili 3 itd
    //console.log('props.ingredients[ingredientName]: ' + props.ingredients[ingredientName]);
    //{bacon: 1, cheese: 0, meat: 0, salad: 1}
    //console.log('ingredients: ' + ingredients);
  }

  //ovo ispod je alternativa za kod iznad za ingredientOutput2

  /*const ingredientOutput2 = Object.keys(props.ingredients).map((ig) => {
    return (
      <span className={classes.IngredientsOutput} key={ig.name}>
        {ig} ({props.ingredients[ig]})
      </span>
    );
  }); */

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span className={classes.IngredientsOutput} key={ig.name}>
        {ig.name} ({ig.value})
      </span>
    );
    /*
      0: {name: "bacon", value: 1}
      1: {name: "cheese", value: 1}
      */
  });

  //const customerOutput =

  return (
    //dole u divu zelimo outputsti dakle ingredients i total price
    //A ingredients iz Checkouta koliko se sjecam

    //Ovaj fajl Order je kako treba da izgleda jedan single Order
    //A tamo u Orders definisemo ih onoliko koliko ih treba

    <div className={classes.Order}>
      <div className={classes.IngredientsWord}>Ingredients:</div>{" "}
      {ingredientOutput}
      <p>
        Price: <strong>{props.price.toFixed(2)} KM</strong>
      </p>
    </div>
  );
};

export default Order;
