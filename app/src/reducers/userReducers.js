const { USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS, USER_SIGN_IN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGN_IN_AFTER_REG, USER_SIGN_IN_AFTER_UPDATE_INFO, USER_UPDATE_INFO_REQUEST, USER_UPDATE_INFO_SUCCESS, USER_UPDATE_INFO_FAIL, USER_UPDATE_AVATAR_SUCCESS, USER_UPDATE_AVATAR_FAIL, USER_UPDATE_AVATAR_REQUEST, USER_SIGN_IN_AFTER_UPDATE_AVATAR, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_SUCCESS, USER_UPDATE_PASSWORD_FAIL,USER_UPDATE_PASSWORD_CLEAN_STATE, USER_SIGN_IN_OUT } = require("../constants/userConstants");

function userSignInReducer(state = {}, action) {
  switch(action.type) {
    case USER_SIGN_IN_REQUEST:
      return { loading: true };
    case USER_SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_FAIL:
      return { loading: false, error: action.payload.response.data };
    case USER_SIGN_IN_AFTER_REG:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_AFTER_UPDATE_INFO:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_AFTER_UPDATE_AVATAR:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_OUT:
      return { loading: false, userInfo: null };
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
      return { loading: false, error: action.payload.response.data };
    default:
      return state;
  }
}

function userUpdateInfoReducer(state = {}, action) {
  switch(action.type) {
    case USER_UPDATE_INFO_REQUEST:
      return { loadingUpdateInfo: true };
    case USER_UPDATE_INFO_SUCCESS:
      return { loadingUpdateInfo: false, userInfo: action.payload };
    case USER_UPDATE_INFO_FAIL:
      return { loadingUpdateInfo: false, errorUpdateInfo: action.payload };
    default:
      return state;
  }
}

function userUpdatePasswordReducer(state = {}, action) {
  switch(action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loadingUpdatePassword: true, successUpdatePassword: false, errorUpdatePassword: false };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loadingUpdatePassword: false, successUpdatePassword: action.payload, errorUpdatePassword: false };
    case USER_UPDATE_PASSWORD_FAIL:
      return { loadingUpdatePassword: false, errorUpdatePassword: action.payload.response.data, successUpdatePassword: false };
    case USER_UPDATE_PASSWORD_CLEAN_STATE:
      return { loadingUpdatePassword: false, errorUpdatePassword: false, successUpdatePassword: false };
    default:
      return state;
  }
}

function userUpdateAvatarReducer(state = {}, action) {
  switch(action.type) {
    case USER_UPDATE_AVATAR_REQUEST:
      return { loadingUpdateAvatar: true };
    case USER_UPDATE_AVATAR_SUCCESS:
      return { loadingUpdateAvatar: false, userInfo: action.payload };
    case USER_UPDATE_AVATAR_FAIL:
      return { loadingUpdateAvatar: false, errorUpdateAvatar: action.payload };
    default:
      return state;
  }
}

export { userSignInReducer, userRegisterReducer, userUpdateInfoReducer, userUpdateAvatarReducer, userUpdatePasswordReducer };