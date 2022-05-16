import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public name: string | undefined;
  public description: string | undefined;
  public imagePath: string | undefined;
  public ingredients: Ingredient[];

  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
