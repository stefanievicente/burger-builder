import * as actions from "./actions";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actions.ADD_INGREDIENT,
    ingredient: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actions.REMOVE_INGREDIENT,
    ingredient: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actions.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actions.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-builder-327f8.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
