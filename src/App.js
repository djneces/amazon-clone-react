import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./Orders";



// Stripe payments 
const promise = loadStripe('pk_test_51I5wX7AF4AzYfXhTlWJwrEk77MwzBGpV0sPvcufS0uuxGTO7rWcpDYIry1DVqOXJxYsmtzwiP5A9XEREgFDxG1be00d7URelG0');

function App() {
  const [{}, dispatch] = useStateValue();

  // listens who is signed in , needed to update reducer.js
  useEffect(() => {
    //runs only once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS ***',authUser );
      if(authUser) {
        //the user just logged in/was logged in
        dispatch({
          //save user into the data layer
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          //set user as null in the data layer
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        {/* header rendered for all  */}
   
      {/* switch once and route for each route */}
        <Switch>

          <Route path="/orders">
          <Header />
          <Orders />
          </Route>

          <Route path="/login">
          <Login />
          </Route>

          <Route path="/checkout">
          <Header />
            <Checkout/>
          </Route>

          <Route path="/payment">
          <Header />

          {/* wrap payments in elements for stripe payment */}
          <Elements stripe={promise}>
          <Payment />
          </Elements>

          </Route>

{/* home route on the bottom  */}
          <Route path="/">
          <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
