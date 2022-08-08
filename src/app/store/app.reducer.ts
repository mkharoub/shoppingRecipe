import {ActionReducerMap} from "@ngrx/store";

import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromRecipe from "../recipes/store/recipe.reducer";

/**
 * Notes:
 * The store initially dispatch an action with no name, so it's important to return the default state always.
 * Any action we dispatch it reaches all reducers.
 */
export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipe: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipe: fromRecipe.recipeReducer
} as any;
