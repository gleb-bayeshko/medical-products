import React from 'react';
import './sass/main.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import ProductScreen from './components/screens/ProductScreen';
import HomeScreen from './components/screens/HomeScreen';

import ScrollToTop from './ScrollToTop';

function App() {
  return (
  <BrowserRouter>
    <ScrollToTop />
    <Header />
    <main>
      <Switch>
        <Route exact path="/cart">
          ddfsdfds
        </Route>
        <Route exact path="/products/:id" component={ProductScreen} />
        <Route exact path="/" component={HomeScreen} />
      </Switch>
    </main>
  </BrowserRouter>
  );
}

export default App;
