import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { useStateValue } from './StateProvider';
import { setUser } from './store/action/Login';
import { auth } from './firebase';
import Checkout from './Checkout/Checkout';
import Header from './Header/Header';
import Home from './Home/Home';
import SignIn from './signIn/SignIn';
import './App.css';
import Payment from './Payment/Payment';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders/Orders';


function App() {

  const [{}, dispatch] = useStateValue();

  const promise = loadStripe('pk_test_51HsxAWDPuGjEr58rfmfp6uGftITGtx9LMoHsOiAab2ttGGsvtuILmNRdNkH5C95rGmjm7HxP3QwgZp7Du13QP8pf00iCWa3jue')

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            console.log('THE USER IS >>>', authUser)

            if (authUser) {
              dispatch(setUser(authUser))
            } else {
              dispatch(setUser())
            }
        })

    }, [])


  return (

    <BrowserRouter>
        <div className="App">
        
          <Switch>
                <Route path="/orders">
                    <Header/>
                    <Orders/>
                </Route>
                <Route path="/signIn">
                <SignIn/>
                </Route>
                <Route path="/checkout">
                    <Header />
                    <Checkout />
                </Route>
                <Route path="/payment">
                  <Header/>
                  <Elements stripe={promise}>
                    <Payment/>
                  </Elements>
                </Route>
                <Route path="/">
                    <Header />
                    <Home/>
                </Route>
          </Switch>
          
        </div>
    </BrowserRouter>
  );
}

export default App;
