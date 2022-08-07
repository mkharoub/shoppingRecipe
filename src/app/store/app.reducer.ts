import {ActionReducerMap} from "@ngrx/store";

import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";

/**
 * Notes:
 * The store initially dispatch an action with no name, so it's important to return the default state always.
 * Any action we dispatch it reaches all reducers.
 */
export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
} as any;
