import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {Recipe} from "../recipe.model";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select('recipe').subscribe(recipeState => {
      this.recipes = recipeState.recipes;
    });
  }

  ngOnDestroy() {
    this.recipesSubscription?.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
