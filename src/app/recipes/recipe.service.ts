import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe1',
      'This is a simple recipe test!',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      [
        new Ingredient('Ingredient1', 5),
        new Ingredient('Ingredient2', 10),
      ]
    ),
    new Recipe(
      'Test Recipe2',
      'This is a simple recipe test!',
      'https://www.simplyrecipes.com/thmb/JWjdE8YwikAae0KZuyy6ZJW7Utw=/3000x2001/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg',
      [
        new Ingredient('Ingredient3', 15),
        new Ingredient('Ingredient4', 20),
      ]
    ),
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
