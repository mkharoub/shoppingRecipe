import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm | undefined;

  editMode = false;
  editingIngredientSubscription: Subscription | undefined;
  selectedIngredient: Ingredient | null | undefined;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.editingIngredientSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex === -1) {
        this.editMode = false;

        return;
      }

      this.editMode = true;
      this.selectedIngredient = stateData.editedIngredientItem;
      this.shoppingListForm?.setValue({
        name: this.selectedIngredient?.name,
        amount: this.selectedIngredient?.amount
      });
    });
  }

  onSubmit() {
    if (this.shoppingListForm?.valid) {
      const ingredientName = this.shoppingListForm.value.name;
      const ingredientAmount = this.shoppingListForm.value.amount;
      const newIngredient = new Ingredient(ingredientName, ingredientAmount);

      if (this.editMode) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
        this.editMode = false;
      } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
      }

      this.clearForm();
    }
  }

  clearForm() {
    this.shoppingListForm?.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();
  }

  ngOnDestroy() {
    this.editingIngredientSubscription?.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
