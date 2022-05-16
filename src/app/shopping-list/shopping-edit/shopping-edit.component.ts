import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName') inputNameRef: ElementRef | undefined;
  @ViewChild('inputAmount') inputAmountRef: ElementRef | undefined;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onSubmit(e: Event) {
    e.preventDefault();

    const ingredientName = this.inputNameRef?.nativeElement.value;
    const ingredientAmount = this.inputAmountRef?.nativeElement.value;

    this.shoppingListService.addIngredient(new Ingredient(ingredientName, ingredientAmount));

    this.clearForm();
  }

  clearForm() {
    (this.inputNameRef?.nativeElement).value = '';
    (this.inputAmountRef?.nativeElement).value = '';
  }
}
