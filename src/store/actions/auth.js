import * as actions from "./actions";

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actions.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAutTimeout = (expTime) => {
  return {
    type: actions.AUTH_CHECK_TIMEOUT,
    expTime: expTime,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actions.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return {
    type: actions.AUTH_CHECK_INITIAL_STATE
  }
};
