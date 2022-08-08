import * as RecipeActions from "./recipe.actions";
import {Recipe} from "../recipe.model";

export interface State {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
}

const initialState: State = {
  recipes: [],
  selectedRecipe: null
}

export const recipeReducer = (state = initialState, action: RecipeActions.RecipeActions) => {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload.slice()
      }
    case RecipeActions.SET_RECIPE:
      return {
        ...state,
        selectedRecipe: {...state.recipes[action.payload]}
      }
    case RecipeActions.DELETE_RECIPE:
      const recipesToDelete = state.recipes.slice();
      recipesToDelete.splice(action.payload, 1)

      return {
        ...state,
        recipes: recipesToDelete,
        selectedRecipe: null
      }
    case RecipeActions.UPDATE_RECIPE:
      const recipesToUpdate = state.recipes.slice();
      recipesToUpdate[action.payload.index] = action.payload.recipe;
      return {
        ...state,
        recipes: recipesToUpdate,
        selectedRecipe: recipesToUpdate[action.payload.index]
      }
    case RecipeActions.ADD_RECIPE:
      const recipesToAdd = state.recipes.slice();
      recipesToAdd.push(action.payload);

      return {
        ...state,
        recipes: recipesToAdd
      }
    default:
      return state;
  }
}
