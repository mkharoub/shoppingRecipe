import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

/**
 * We used this resolver to load recipes even if we on the recipe details route.
 * also, we didn't subscribe here since the resolve do the subscription for us.
 */

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();

    if (!recipes.length) {
      return this.dataStorageService.fetchRecipes();
    }

    return recipes;
  }
}
