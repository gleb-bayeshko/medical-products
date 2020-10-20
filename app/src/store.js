import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productsToCartReducer } from './reducers/productReducers';

const cartProducts = Cookie.getJSON('cartProducts') || [];

const initialState = {productsToCart: cartProducts};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productsToCart: productsToCartReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;