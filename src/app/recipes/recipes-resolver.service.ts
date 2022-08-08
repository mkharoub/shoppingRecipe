import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {take} from "rxjs/operators";

import {DataStorageService} from "../shared/data-storage.service";
import * as fromApp from "../store/app.reducer";

/**
 * We used this resolver to load recipes even if we on the recipe details route.
 * also, we didn't subscribe here since the resolve do the subscription for us.
 */

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<any> {
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.store.select('recipe').pipe(take(1)).subscribe(recipeState => {
      if (!recipeState.recipes.length) {
        this.dataStorageService.fetchRecipes().pipe(take(1)).subscribe();
      }
    });
  }
}
