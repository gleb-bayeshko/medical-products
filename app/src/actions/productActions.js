import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";
import { PRODUCT_TO_CART } from "../constants/productConstants";

import axios from 'axios';
import Cookie from 'js-cookie';

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch(error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}

const detailsProduct = (productId, productCategory) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
    const { data } = await axios.get(`/api/products/${productCategory}/${productId}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message})
  }
}

const productsToCart = (product, qty, color = null) => (dispatch, getState) => {
  product.qty = qty;
  product.colorActive = color;
  dispatch( {
    type: PRODUCT_TO_CART,
    payload: product,
  })

  const { productsToCart: cartProducts } = getState();
  Cookie.set('cartProducts', JSON.stringify(cartProducts));
}

export { listProducts, detailsProduct, productsToCart };