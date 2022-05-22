import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm | undefined;

  editMode = false;
  editingIngredientSubscription: Subscription | undefined;
  editIngredientId: number | undefined;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.editingIngredientSubscription = this.shoppingListService.editingIngredient
      .subscribe(
        (ingredientId: number) => {
          this.editMode = true;
          this.editIngredientId = ingredientId;

          const selectedIngredient = this.shoppingListService.getIngredient(ingredientId);

          this.shoppingListForm?.setValue({
            name: selectedIngredient.name,
            amount: selectedIngredient.amount
          })
        }
      )
  }

  onSubmit() {
    if (this.shoppingListForm?.valid) {
      const ingredientName = this.shoppingListForm.value.name;
      const ingredientAmount = this.shoppingListForm.value.amount;

      if (this.editMode) {
        this.shoppingListService.updateIngredient(
          new Ingredient(ingredientName, ingredientAmount),
          this.editIngredientId
        )

        this.editMode = false;
      } else {
        this.shoppingListService.addIngredient(
          new Ingredient(ingredientName, ingredientAmount)
        )
      }

      this.clearForm();
    }
  }

  clearForm() {
    this.shoppingListForm?.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    if (typeof this.editIngredientId !== 'undefined') {
      this.shoppingListService.deleteIngredient(this.editIngredientId);
      this.clearForm();
    }
  }

  ngOnDestroy() {
    this.editingIngredientSubscription?.unsubscribe();
  }
}
