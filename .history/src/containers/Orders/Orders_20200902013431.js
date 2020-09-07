import React, {  useEffect } from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
//import axios from '../../axios-orders';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = (props) => {
  //sada je preko reduxa
  /*state = {
    orders: [],
    loading:true

}*/

  //fetching orders from server
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, [props.token, props.userId]);

  //Outputting orders

  let orders = <Spinner />;

  //debugger;

  if (!props.loading) {
    //debugger;
    orders = props.orders.map((order) => (
      //[{id: "-MGASxDVTnjY21vZsKxB"      ingredients: {bacon: 0, cheese: 0, kecap: 0, meat: 0, salad: 1}       orderData: {country: "v", deliveryMethod: "fastest", email: "a.k@gmail.com", name: "a", street: "d", …}       price: 2.5      userId: "QvKFH4q5q8eZKGOdc }, {}]
      <Order
        key={order.id}
        ingredients={order.ingredients}
        /*to fixed() nije radilo dok nisam dodao ovaj plus koji ga pretvara u number */
        price={+order.price}
      />
    ));
    debugger;
  }

  return <div>{orders}</div>;
};

//1. konfiguracija

const mapStateToProps = (state) => {
  //debugger;
  return {
    loading: state.orderR.loading,
    orders: state.orderR.orders, //[{id: "-MCqw5i8QspVXsWqlsmz", ingredients: {bacon: 1, cheese: 1, kecap: 0, meat: 0, salad: 1}, orderData: {country: "bih", deliveryMethod: "fastest", email: "a.k@gmail.com", name: "f", street: "f", …}, price: 3.5, userId: "dSfmP8KgsnVhS9ZNQ1lyT5EM5d73"}]
    token: state.authR.token, //authSuccess u authR.js-u
    userId: state.authR.userId, //authSuccess u authR.js-u
  };
};

//2. konfiguracija

const mapDispatchToProps = (dispatch) => {
  //debugger;
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
