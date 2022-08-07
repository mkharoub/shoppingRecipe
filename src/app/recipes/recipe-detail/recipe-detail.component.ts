import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

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
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList() {
    if (!this.recipe?.ingredients?.length) return;

    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id as any);
    this.router.navigate(['../'])
  }
}
