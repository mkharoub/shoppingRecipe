import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private apiUrl = 'https://shoppingrecipe-5eb62-default-rtdb.firebaseio.com';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.httpClient.put(
      `${this.apiUrl}/recipes.json`,
      recipes
    ).subscribe((response) => {
      console.log("storeRecipes response: ", response);
    })
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(`${this.apiUrl}/recipes.json`)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients || []
            }
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
          console.log("fetchRecipes response: ", recipes);
        })
      )
  }
}
