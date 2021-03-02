import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* initIngredientsSaga() {
   try {
    const response = yield axios
    .get("https://react-burger-builder-327f8.firebaseio.com/ingredients.json")
    yield put(actions.setIngredients(response.data));
    
   } catch (error) {
    yield put(actions.fetchIngredientsFailed(error))
   }
}
