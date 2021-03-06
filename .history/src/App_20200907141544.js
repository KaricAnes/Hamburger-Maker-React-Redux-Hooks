import React, { useEffect } from "react";

import Layout from "./hoc/Layout/Layout";

import Hamburger from "./containers/BurgerBuilder/BurgerBuilder";

import Checkout from "./containers/Checkout/Checkout";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Orders from "./containers/Orders/Orders";

import Auth from "./containers/Auth/Auth";

import Logout from "./containers/Auth/Logout/Logout";

import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

const App = (props) => {
  const { onTryAutoSignUp } = props;
  //object destructuring  da bismo mogli onTryAutoSignUp staviti u dependencies u useEffectu
  //mogli smo i cijeli props staviti ali bi to bilo glupo jer nam iz propsa treba samo onTryAutoSignUp()
  useEffect(() => {
    //nekad bilo comDidMount()
    onTryAutoSignUp();
  }, [onTryAutoSignUp]); //useffect ce se ranati nakon prvog rendering-a i svaki put kada se ova funkcija promjeni

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={Hamburger} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkoutt" component={Checkout} />
        <Route path="/auth" component={Auth} />
        <Route path="/orderss" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Hamburger} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    /*  Switch se korsti da nam ne bi ucitalo vise ruta odjednom nego samo jednu, i to onu ciji put
    bude odgovarao. U Switchu je order ruta jako bitan. / uvijek treba biti zadnja.  
    KAda imamo switch poredak je jako bitan. I exact je moguce rjesenje ako ne zelimo korstiti switch
    Ako zelimo vise komponenti odjednom, onda moramo korsitiiti nested-routin g. 
    Nested Routing sluzi da bismo mogli ucitati nekoliko stvari odjednom: Checkot.js */

    <div>
      <Layout>
        {/*NAmjerno smo stavili da se ne zatvara sama jer je ideja iza cijelog Layouta da mozemo wrapati drugu komponentu sa njim */}

        {routes}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.authR.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actionCreators.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
