import { PRODUCT_QTY_CHANGE, PRODUCT_DELETE, CART_CLEAN } from "../constants/productConstants";

import Cookie from 'js-cookie';

const productInCartQty = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: PRODUCT_QTY_CHANGE,
    payload: {_id: id, qty: qty}
  })

  const { productsToCart: cartProducts } = getState();
  Cookie.set('cartProducts', JSON.stringify(cartProducts));
}

const productDelete = (id) => (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE,
    payload: {_id: id}
  })

  const { productsToCart: cartProducts } = getState();
  Cookie.set('cartProducts', JSON.stringify(cartProducts));
}

const cleanCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_CLEAN,
  })

  const { productsToCart: cartProducts } = getState();
  Cookie.set('cartProducts', JSON.stringify(cartProducts));
}

export { productInCartQty, productDelete, cleanCart };
