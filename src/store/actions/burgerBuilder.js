import * as actions from "./actions";

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
  return {
     type: actions.INIT_INGREDIENTS
  };
};
