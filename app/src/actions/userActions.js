import axios from "axios";
import { USER_SIGN_IN_FAIL, USER_SIGN_IN_REQUEST, USER_SIGN_IN_UPDATE_CART, USER_SIGN_IN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_INFO_REQUEST, USER_UPDATE_INFO_SUCCESS, USER_UPDATE_INFO_FAIL, USER_SIGN_IN_AFTER_REG, USER_SIGN_IN_AFTER_UPDATE_INFO, USER_SIGN_IN_AFTER_UPDATE_AVATAR, USER_UPDATE_AVATAR_REQUEST, USER_UPDATE_AVATAR_SUCCESS, USER_UPDATE_AVATAR_FAIL, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_SUCCESS, USER_UPDATE_PASSWORD_FAIL, USER_UPDATE_PASSWORD_CLEAN_STATE, USER_SIGN_IN_OUT } from "../constants/userConstants";
import Cookie from 'js-cookie';
import { CART_CLEAN, PRODUCT_TO_CART_UPDATE_AFTER_SIGN_IN } from "../constants/productConstants";

const signIn = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SIGN_IN_REQUEST, payload: { email } });
    const { data } = await axios.post('api/users/signin', { email, password });

    const { productsToCart } = getState();
    const updatedUserCart = await axios.post('api/users/update-user-cart', { currentCart: productsToCart.products, userCart: data.cart }, { headers: {
      'Authorization': `Bearer ${data.token}`
    } });

    data.cart = updatedUserCart.data;
    dispatch({ type: PRODUCT_TO_CART_UPDATE_AFTER_SIGN_IN, payload: updatedUserCart.data });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    const { productsToCart: cartProducts } = getState();
    Cookie.set("cartProducts", JSON.stringify(cartProducts));
  } catch (error) {
    dispatch({ type: USER_SIGN_IN_FAIL, payload: error});
  }
}

const signOut = () => (dispatch) => {
  Cookie.remove('userInfo');
  Cookie.remove('cartProducts');
  dispatch({ type: CART_CLEAN })
  dispatch({ type: USER_SIGN_IN_OUT });
}

const register = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email } });
    const { data } = await axios.post('api/users/register', { name, email, password });

    const { productsToCart } = getState();
    const updatedUserCart = await axios.post('api/users/update-user-cart', { currentCart: productsToCart.products, userCart: data.cart }, { headers: {
      'Authorization': `Bearer ${data.token}`
    } });

    data.cart = updatedUserCart.data;
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    const { userRegister } = getState();
    dispatch({ type: USER_SIGN_IN_AFTER_REG, payload: userRegister.userInfo });
    Cookie.set('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error });
  }
}

const userUpdateInfo = (info) => async (dispatch, getState) => {
  try {
    const { userSignIn: { userInfo: { token } } } = getState();
    const { userSignIn: { userInfo } } = getState();

    dispatch({ type: USER_UPDATE_INFO_REQUEST, payload: info });
    const { data } = await axios.post('api/users/update-info', info, { headers: {
      'Authorization': `Bearer ${token}`
    } });
    dispatch({ type: USER_UPDATE_INFO_SUCCESS, payload: data });

    dispatch({ type: USER_SIGN_IN_AFTER_UPDATE_INFO, payload: {...userInfo, ...data} });
    Cookie.set('userInfo', JSON.stringify({...userInfo, ...data}));
  } catch (error) {
    dispatch({ type: USER_UPDATE_INFO_FAIL, payload: (error.response && error.response.data) || error.message || error });
  }
}

const userUpdatePassword = (passwords) => async (dispatch, getState) => {
  try {
    const { userSignIn: { userInfo: { token } } } = getState();

    dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.post('api/users/update-password', passwords, { headers: {
      'Authorization': `Bearer ${token}`
    } });
    dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload: error});
  }
}

const userUpdatePasswordCleanState = () => {
  return { type: USER_UPDATE_PASSWORD_CLEAN_STATE };
}

const userUpdateAvatar = (avatar) => async (dispatch, getState) => {
  try {
    const { userSignIn: { userInfo: { token } } } = getState();
    const { userSignIn: { userInfo } } = getState();

    dispatch({ type: USER_UPDATE_AVATAR_REQUEST, payload: { avatar } });
    const { data } = await axios.post('api/users/update-avatar', { avatar }, { headers: {
      'Authorization': `Bearer ${token}`
    } });
    dispatch({ type: USER_UPDATE_AVATAR_SUCCESS, payload: data });

    dispatch({ type: USER_SIGN_IN_AFTER_UPDATE_AVATAR, payload: {...userInfo, ...data} });
    Cookie.set('userInfo', JSON.stringify({...userInfo, ...data}));
  } catch (error) {
    dispatch({ type: USER_UPDATE_AVATAR_FAIL, payload: (error.response && error.response.data) || error.message || error });
  }
}

export { signIn, register, userUpdateInfo, userUpdateAvatar, userUpdatePassword, userUpdatePasswordCleanState, signOut };