import React from 'react';
import './sass/main.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import ProductScreen from './components/screens/ProductScreen';
import HomeScreen from './components/screens/HomeScreen';

function App() {
  return (
  <BrowserRouter>
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path="/cart">
            ddfsdfds
          </Route>
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Switch>
      </main>
    </>
  </BrowserRouter>
  );
}

export default App;
