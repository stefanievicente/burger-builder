import { put, delay, call } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationTime");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
}

export function* checkAutTimeoutSaga(action) {
  yield delay(action.expTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  const url = action.isSignUp
    ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcF4sIFmymsRkf8ihZTFk-euGP8Hjb74U"
    : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcF4sIFmymsRkf8ihZTFk-euGP8Hjb74U";

  try {
    const response = yield axios.post(url, authData);

    const expirationTime = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationTime", expirationTime);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAutTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationTime = yield new Date(localStorage.getItem("expirationTime"));
    if (expirationTime <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAutTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}