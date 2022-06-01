import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private recipesEndPoint = 'https://shoppingrecipe-5eb62-default-rtdb.firebaseio.com';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.httpClient.put(`${this.recipesEndPoint}/recipes.json`, recipes).subscribe();
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
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
