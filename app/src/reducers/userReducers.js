const { USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS, USER_SIGN_IN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } = require("../constants/userConstants");

function userSignInReducer(state = {}, action) {
  switch(action.type) {
    case USER_SIGN_IN_REQUEST:
      return { loading: true };
    case USER_SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch(action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { userSignInReducer, userRegisterReducer };