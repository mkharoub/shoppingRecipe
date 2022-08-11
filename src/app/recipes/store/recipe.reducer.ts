import * as RecipeActions from "./recipe.actions";
import {Recipe} from "../recipe.model";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export const recipeReducer = (state = initialState, action: RecipeActions.RecipeActions) => {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload.slice()
      }
    case RecipeActions.DELETE_RECIPE:
      const recipesToDelete = state.recipes.slice();
      recipesToDelete.splice(action.payload, 1)

      return {
        ...state,
        recipes: recipesToDelete
      }
    case RecipeActions.UPDATE_RECIPE:
      const recipesToUpdate = state.recipes.slice();
      recipesToUpdate[action.payload.index] = action.payload.recipe;
      return {
        ...state,
        recipes: recipesToUpdate
      }
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    default:
      return state;
  }
}
