import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {switchMap, take} from "rxjs/operators";
import {Observable, of} from "rxjs";

import {DataStorageService} from "../shared/data-storage.service";
import * as fromApp from "../store/app.reducer";
import {Recipe} from "./recipe.model";

/**
 * We used this resolver to load recipes even if we on the recipe details route.
 * also, we didn't subscribe here since the resolve do the subscription for us.
 */

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipe').pipe(
      take(1),
      switchMap(recipeState => {
        if (recipeState.recipes.length) {
          return of(recipeState.recipes);
        }

        return this.dataStorageService.fetchRecipes();
      })
    )
  }
}
