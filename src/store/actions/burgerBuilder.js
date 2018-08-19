import * as actionType from "./actionTypes";
import AxiosInstance from "../../axios-orders";

export const addIngredient = igName => {
  return { type: actionType.ADD_INGREDIENT, ingredientName: igName };
};

export const removeIngredient = igName => {
  return { type: actionType.REMOVE_INGREDIENT, ingredientName: igName };
};

export const setIngredients = ingredients => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    AxiosInstance.get(
      "https://react-galala-burger.firebaseio.com/ingredients.json"
    )
      .then(response => {
        dispatch(setIngredients(response.data));
        // this.setState({ ingredients: response.data });
      })
      .catch(err => {
        // this.setState({ error: true });
        dispatch(fetchIngredientsFailed());
      });
  };
};
