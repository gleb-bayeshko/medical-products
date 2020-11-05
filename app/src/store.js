import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productsToCartReducer, productCreateReducer, productDeleteReducer, loadCartProductsReducer, sortProductsReducer } from './reducers/productReducers';
import { userSignInReducer, userRegisterReducer, userUpdateInfoReducer, userUpdateAvatarReducer, userUpdatePasswordReducer } from './reducers/userReducers';

const cartProducts = Cookie.getJSON('cartProducts') || {products: []};
const userInfo = Cookie.getJSON('userInfo') || null;


const initialState = {productsToCart: cartProducts, userSignIn: { userInfo }};
const reducer = combineReducers({
  productList: productListReducer,
  sortProducts: sortProductsReducer,
  loadCartProducts: loadCartProductsReducer,
  productDetails: productDetailsReducer,
  productsToCart: productsToCartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userUpdateInfo: userUpdateInfoReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userUpdateAvatar: userUpdateAvatarReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;