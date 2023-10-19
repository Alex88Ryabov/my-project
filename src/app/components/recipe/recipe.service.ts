import {Injectable} from '@angular/core';
import {RecipeModel} from "../../models/recipe.model";
import {IngredientModel} from "../../models/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private ingredients: IngredientModel[] = [];
  private recipes: RecipeModel[] = [
    new RecipeModel('A Test Recipe',
      'This is a simply test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new IngredientModel('Meat', 1),
        new IngredientModel('Milk', 2),
      ]
    ),
    new RecipeModel('Another Test Recipe',
      'This is a simply test number two',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new IngredientModel('Potato', 1),
        new IngredientModel('Cheese', 2),
      ]
    )
  ];

  public get getRecipes(): RecipeModel[] {
    return this.recipes.slice();
  }

  public getRecipeById(id: number) {
    return this.recipes[id];
  }

  public set setIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
  }
}
