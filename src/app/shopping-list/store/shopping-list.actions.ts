import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

/**
 * Note that any action dispatched, it will reach all reducers of the app. therefor in each reducer we return the
 * default state (super important), Also, with the bigger apps you might write the same action name which cause a problem
 * the actions must be unique in whole app, so there is a pattern used NGRX that values of actions contains the feature name
 * as below here.
 */

/**
 * We follow this pattern with the names of actions to avoid collegians
 * with other action with the same name in the big apps;
 */
export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number | undefined) {
  }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
