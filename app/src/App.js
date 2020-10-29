import React from 'react';
import './sass/main.scss';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import ProductScreen from './components/screens/ProductScreen';
import HomeScreen from './components/screens/HomeScreen';
import CartScreen from './components/screens/CartScreen';
import SignInScreen from './components/screens/SignInScreen';
import RegisterScreen from './components/screens/RegisterScreen';

import ScrollToTop from './ScrollToTop';
import { deleteColorPopUp } from './ListenersFunctions';
import ProductAdminScreen from './components/screens/ProductAdminScreen';

function App() {
  window.addEventListener("click", deleteColorPopUp);

  return (
  <BrowserRouter>
    <ScrollToTop />
    <Header />
    <main>
      <Switch>
        <Route exact path="/signin" component={SignInScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route exact path="/cart" component={CartScreen}/>
        <Route exact path="/product-admin" component={ProductAdminScreen}/>
        <Route exact path="/products/:category/:id" component={ProductScreen} />
        <Route exact path="/products/:category" component={HomeScreen} />
        <Route exact path="/products" component={HomeScreen}>
          <Redirect to="/products/all"/>
        </Route>
        <Route exact path="/" component={HomeScreen} />
      </Switch>
    </main>
  </BrowserRouter>
  );
}

export default App;
