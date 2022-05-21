import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public id: number | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public imagePath: string | undefined;
  public ingredients: Ingredient[];

  constructor(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
