import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_CART_PRODUCTS_LIST_REQUEST,
  PRODUCT_CART_PRODUCTS_LIST_SUCCESS,
  PRODUCT_CART_PRODUCTS_LIST_FAIL,
  PRODUCT_CREATION_REQUEST,
  PRODUCT_CREATION_SUCCESS,
  PRODUCT_CREATION_FAIL,
  PRODUCT_CREATION_CLEAN_ERROR,
  PRODUCT_DELETION_FAIL,
  PRODUCT_DELETION_SUCCESS,
  PRODUCT_DELETION_REQUEST,
  PRODUCT_CART_PRODUCTS_LIST_QTY_CHANGE,
  PRODUCTS_SORT_DATE_DESC,
} from "../constants/productConstants";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_CLEAN,
} from "../constants/productConstants";
import { PRODUCT_TO_CART } from "../constants/productConstants";

import axios from "axios";
import Cookie from "js-cookie";

const listProducts = (
  category = "all",
  sort = PRODUCTS_SORT_DATE_DESC
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.post("/api/products", {
      category: category,
      sort: sort,
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const sortProducts = (sortType) => (dispatch) => {
  dispatch({ type: sortType });
};

const loadCartProducts = (loadCartProductsList, withoutReq = false) => async (
  dispatch,
  getState
) => {
  try {
    if (!withoutReq) {
      dispatch({ type: PRODUCT_CART_PRODUCTS_LIST_REQUEST });
      const { data } = await axios.post("/api/products/cart-products-list", {
        productsToLoad: loadCartProductsList,
      });
      dispatch({ type: PRODUCT_CART_PRODUCTS_LIST_SUCCESS, payload: data });
    } else {
      const productsToCart = getState().productsToCart.products;
      const loadCartProducts = getState().loadCartProducts.cartProducts;
      loadCartProducts.map((currentProduct) => {
        const newQty = productsToCart.find(
          (elem) => currentProduct.foundProduct._id === elem._id
        ).qty;
        currentProduct.qty = newQty;
        return currentProduct;
      });
      dispatch({
        type: PRODUCT_CART_PRODUCTS_LIST_QTY_CHANGE,
        payload: loadCartProducts,
      });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_CART_PRODUCTS_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId = null, productCategory = null) => async (
  dispatch
) => {
  try {
    if (!productId || !productCategory) {
      dispatch({ type: PRODUCT_DETAILS_CLEAN });
      return;
    }
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      `/api/products/${productCategory.toLowerCase()}/${productId}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const productsToCart = (product, qty, color = null) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_TO_CART,
      payload: { _id: product._id, qty: qty, colorActive: color },
    });

    const {
      userSignIn: { userInfo },
    } = getState();
    if (userInfo) {
      const { productsToCart } = getState();
      const updatedUserCart = await axios.post(
        "/api/users/update-user-cart",
        { currentCart: productsToCart.products, userCart: null },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (!updatedUserCart) throw Error("Cannot update user cart");
    }
    const { productsToCart: cartProducts } = getState();
    Cookie.set("cartProducts", JSON.stringify(cartProducts));
  } catch (error) {
    console.log(error);
  }
};

const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATION_REQUEST, payload: product });
    const {
      userSignIn: { userInfo },
    } = getState();
    if (!userInfo) {
      throw new Error("Sign in as administrator");
    }
    if (!product._id) {
      const { data } = await axios.post("/api/products/save-card", product, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: PRODUCT_CREATION_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        `/api/products/save-card/${product._id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: PRODUCT_CREATION_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATION_FAIL,
      payload:
        (error.response && error.response.data) || error.message || error,
    });
  }
};

const cleanCreateProductError = () => {
  return { type: PRODUCT_CREATION_CLEAN_ERROR };
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETION_REQUEST, payload: productId });
    const {
      userSignIn: { userInfo },
    } = getState();
    if (!userInfo) {
      throw new Error("Sign in as administrator");
    }
    const { data } = await axios.delete(
      `/api/products/delete-card/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: PRODUCT_DELETION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETION_FAIL,
      payload:
        (error.response && error.response.data) || error.message || error,
    });
  }
};

export {
  listProducts,
  loadCartProducts,
  detailsProduct,
  productsToCart,
  createProduct,
  cleanCreateProductError,
  deleteProduct,
  sortProducts,
};
