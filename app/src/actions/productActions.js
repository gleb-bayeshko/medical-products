import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";
import { PRODUCT_TO_CART } from "../constants/productConstants";

import axios from 'axios';

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

const productsToCart = (product, qty) => {
  product.qty = qty;
  return {
    type: PRODUCT_TO_CART,
    payload: product,
  }
}

export { listProducts, detailsProduct, productsToCart };