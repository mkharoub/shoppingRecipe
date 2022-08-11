import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {Recipe} from "../recipe.model";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as RecipeActions from "../store/recipe.actions";
import * as fromApp from "../../store/app.reducer";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  id: number | undefined;
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipe')
      }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    })
  }

  onAddToShoppingList() {
    if (!this.recipe?.ingredients?.length) return;

    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id as any))
    this.router.navigate(['../'])
  }
}
