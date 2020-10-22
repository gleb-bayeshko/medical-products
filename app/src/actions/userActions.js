import axios from "axios";
import { USER_SIGN_IN_FAIL, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";
import Cookie from 'js-cookie';

const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGN_IN_REQUEST, payload: { email, password } });
    const { data } = await axios.post('api/users/signin', { email, password });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_SIGN_IN_FAIL, payload: error.response.data });
  }
}

const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    const { data } = await axios.post('api/users/register', { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data });
  }
}

export { signIn, register };