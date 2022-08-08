import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";

import {Recipe} from "../recipes/recipe.model";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private recipesEndPoint = 'https://shoppingrecipe-5eb62-default-rtdb.firebaseio.com';

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>) {
  }

  storeRecipes() {
    this.store.select('recipe').subscribe(recipeState => {
      this.httpClient.put(`${this.recipesEndPoint}/recipes.json`, recipeState.recipes).subscribe();
    });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.recipesEndPoint}/recipes.json`).pipe(
      map((recipes) => {
        return recipes.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients || []
          }
        })
      }),
      tap(recipes => {
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
      })
    );
  }
}
