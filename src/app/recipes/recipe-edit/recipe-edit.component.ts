import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";

import * as fromApp from "../../store/app.reducer";
import * as RecipeActions from "../store/recipe.actions";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  recipeForm: FormGroup | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = !isNaN(this.id);

        this.initForm();
      }
    );
  }

  private initForm() {
    let name: any = '';
    let imagePath: any = '';
    let description: any = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipe').subscribe(recipeState => {
        const editedRecipe = recipeState.selectedRecipe;

        name = editedRecipe?.name;
        description = editedRecipe?.description;
        imagePath = editedRecipe?.imagePath;

        if (editedRecipe?.ingredients) {
          for (let ingredient of editedRecipe.ingredients) {
            ingredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
              })
            )
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'imagePath': new FormControl(imagePath, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': ingredients
    });
  }

  get ingredientControls() {
    return (<FormArray>this.recipeForm?.get('ingredients')).controls
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        recipe: this.recipeForm?.value,
        index: this.id as any
      }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm?.value));
    }

    this.recipeForm?.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm?.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'amount': new FormControl('', [Validators.required, Validators.min(1)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm?.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.recipeForm?.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
