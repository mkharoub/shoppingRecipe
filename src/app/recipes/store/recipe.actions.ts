import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipe] SET_RECIPES';
export const DELETE_RECIPE = '[Recipe] DELETE_RECIPE';
export const UPDATE_RECIPE = '[Recipe] UPDATE_RECIPE';
export const ADD_RECIPE = '[Recipe] ADD_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { recipe: Recipe, index: number }) {
  }
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export type RecipeActions =
  SetRecipes |
  DeleteRecipe |
  UpdateRecipe |
  AddRecipe;
