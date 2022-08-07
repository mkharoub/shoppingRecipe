import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredientItem: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredientItem: null,
  editedIngredientIndex: -1,
}

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      if (state.ingredients[state.editedIngredientIndex]) {
        const ingredients = [...state.ingredients];

        ingredients[state.editedIngredientIndex] = action.payload;

        return {
          ...state,
          ingredients,
          editedIngredientIndex: -1,
          editedIngredientItem: null
        }
      }

      return state;
    case ShoppingListActions.DELETE_INGREDIENT:
      if (state.ingredients[state.editedIngredientIndex]) {
        const ingredients = [...state.ingredients];

        ingredients.splice(state.editedIngredientIndex, 1);

        return {
          ...state,
          ingredients,
          editedIngredientIndex: -1,
          editedIngredientItem: null
        }
      }

      return state;
    case ShoppingListActions.START_EDIT:
      if (typeof action.payload !== 'undefined') {
        const ingredients = [...state.ingredients];

        return {
          ...state,
          editedIngredientIndex: action.payload,
          editedIngredientItem: ingredients[action.payload]
        }
      }

      return state;
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredientItem: null
      }
    default:
      return state;
  }
}
