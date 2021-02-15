import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 1.5,
  cheese: 3,
  bacon: 4,
  meat: 10,
};

const addIngredient = (state, action) => {
  const updatedIngADD = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1,
  };
  const updatedIngsADD = updateObject(state.ingredients, updatedIngADD);
  const updatedStateADD = {
    ingredients: updatedIngsADD,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
  };
  return updateObject(state, updatedStateADD);
};

const removeIngredient = (state, action) => {
  const updatedIngSUB = {
    [action.ingredient]: state.ingredients[action.ingredient] - 1,
  };
  const updatedIngsSUB = updateObject(state.ingredients, updatedIngSUB);
  const updatedStateSUB = {
    ingredients: updatedIngsSUB,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
  };
  return updateObject(state, updatedStateSUB);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 5,
    error: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actions.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actions.SET_INGREDIENTS:
      return setIngredients(state, action)
    case actions.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true});
    default:
      return state;
  }
};

export default reducer;
