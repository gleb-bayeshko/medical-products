import React from 'react';
import './sass/main.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import ProductScreen from './components/screens/ProductScreen';
import HomeScreen from './components/screens/HomeScreen';
import CartScreen from './components/screens/CartScreen';

import ScrollToTop from './ScrollToTop';
import { deleteColorPopUp } from './ListenersFunctions';

function App() {
  window.addEventListener("click", deleteColorPopUp);

  return (
  <BrowserRouter>
    <ScrollToTop />
    <Header />
    <main>
      <Switch>
        <Route exact path="/cart" component={CartScreen}/>
        <Route exact path="/products/:category/:id" component={ProductScreen} />
        <Route exact path="/" component={HomeScreen} />
      </Switch>
    </main>
  </BrowserRouter>
  );
}

export default App;
