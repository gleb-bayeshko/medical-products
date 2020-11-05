import { PRODUCT_QTY_CHANGE, PRODUCT_DELETE, CART_CLEAN } from "../constants/productConstants";

import axios from "axios";
import Cookie from 'js-cookie';

const productInCartQty = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_QTY_CHANGE,
    payload: {_id: id, qty: qty}
  })

  const { userSignIn: { userInfo } } = getState();
  if (userInfo) {
    const { productsToCart } = getState();
    const updatedUserCart = await axios.post('api/users/update-user-cart', { currentCart: productsToCart.products, userCart: null }, { headers: {
      'Authorization': `Bearer ${userInfo.token}`
    } });
  }
  const { productsToCart: cartProducts } = getState();
  Cookie.set('cartProducts', JSON.stringify(cartProducts));
}

const productDelete = (id) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE,
    payload: {_id: id}
  })

  const { userSignIn: { userInfo } } = getState();
  if (userInfo) {
    const { productsToCart } = getState();
    const updatedUserCart = await axios.post('api/users/update-user-cart', { currentCart: productsToCart.products, userCart: null }, { headers: {
      'Authorization': `Bearer ${userInfo.token}`
    } });
  }

  const { productsToCart: cartProducts } = getState();
  Cookie.set('cartProducts', JSON.stringify(cartProducts));
}

const cleanCart = () => async (dispatch, getState) => {
  dispatch({
    type: CART_CLEAN,
  })

  const { userSignIn: { userInfo } } = getState();
  if (userInfo) {
    const { productsToCart } = getState();
    const updatedUserCart = await axios.post('api/users/update-user-cart', { currentCart: productsToCart.products, userCart: null }, { headers: {
      'Authorization': `Bearer ${userInfo.token}`
    } });
  }

  const { productsToCart: cartProducts } = getState();
  Cookie.set('cartProducts', JSON.stringify(cartProducts));
}

export { productInCartQty, productDelete, cleanCart };
