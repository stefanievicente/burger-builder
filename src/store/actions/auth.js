import * as actions from "./actions";
import axios from "axios";

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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAutTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url = isSignUp
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcF4sIFmymsRkf8ihZTFk-euGP8Hjb74U"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcF4sIFmymsRkf8ihZTFk-euGP8Hjb74U";
    axios
      .post(url, authData)
      .then(({ data }) => {
        const expirationTime = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("userId", data.localId);
        dispatch(authSuccess(data.idToken, data.localId));
        dispatch(checkAutTimeout(data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAutTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
