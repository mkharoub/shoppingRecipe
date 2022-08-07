import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import {Ingredient} from "../shared/ingredient.model";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[]; }> | undefined;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
  }

  onSelectIngredient(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
