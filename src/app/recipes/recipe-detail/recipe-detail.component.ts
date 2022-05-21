import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];

        this.recipe = this.recipeService.getRecipe(id);
      }
    )
  }

  onAddToShoppingList() {
    if (!this.recipe?.ingredients?.length) return;

    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
