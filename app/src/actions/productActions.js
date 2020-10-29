import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_CREATION_REQUEST, PRODUCT_CREATION_SUCCESS, PRODUCT_CREATION_FAIL, PRODUCT_CREATION_CLEAN_ERROR, PRODUCT_DELETION_FAIL, PRODUCT_DELETION_SUCCESS, PRODUCT_DELETION_REQUEST } from "../constants/productConstants";
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";
import { PRODUCT_TO_CART } from "../constants/productConstants";

import axios from 'axios';
import Cookie from 'js-cookie';

const listProducts = (category = 'all') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.post('/api/products', { category: category });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch(error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}

const detailsProduct = (productId, productCategory) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
    const { data } = await axios.get(`/api/products/${productCategory.toLowerCase()}/${productId}`);
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

const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATION_REQUEST, payload: product});
    const { userSignIn: { userInfo } } = getState();
    if (!product._id) {
      const { data } = await axios.post('/api/products/save-card', product, { headers: {
        'Authorization': `Bearer ${userInfo.token}`
      } });
      dispatch({ type: PRODUCT_CREATION_SUCCESS, payload: data});
    } else {
      const { data } = await axios.put(`/api/products/save-card/${product._id}`, product, { headers: {
        'Authorization': `Bearer ${userInfo.token}`
      } });
      dispatch({ type: PRODUCT_CREATION_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({ type: PRODUCT_CREATION_FAIL, payload: error.response.data});
  }
}

const cleanCreateProductError = () => {
  return {type: PRODUCT_CREATION_CLEAN_ERROR}
}

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETION_REQUEST, payload: productId});
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.delete(`/api/products/delete-card/${productId}`, { headers: {
      'Authorization': `Bearer ${userInfo.token}`
    } });
    dispatch({ type: PRODUCT_DELETION_SUCCESS, payload: data});
  } catch (error) {
    dispatch({ type: PRODUCT_DELETION_FAIL, payload: error.response.data});
  }
}

export { listProducts, detailsProduct, productsToCart, createProduct, cleanCreateProductError, deleteProduct };