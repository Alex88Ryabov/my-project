import {Injectable} from '@angular/core';
import {RecipeModel} from '../../shared/models/recipe.model';
import {IngredientModel} from '../../shared/models/ingredient.model';
import {Subject} from 'rxjs';
import {ShoppingService} from '../shopping/shopping.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  public recipesChanged$: Subject<RecipeModel[]> = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = [];

  constructor(private shoppingService: ShoppingService) {}

  public setRecipes(recipes: RecipeModel[]): void {
    this.recipes = recipes;
    this.recipesChanged$.next(this.recipes.slice());
  }

  public getRecipes(): RecipeModel[] {
    return this.recipes.slice();
  }

  public getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  public addRecipe(recipe: RecipeModel): void {
    this.recipes.push(recipe);
    this.recipesChanged$.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: RecipeModel): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged$.next(this.recipes.slice());
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged$.next(this.recipes.slice());
  }
}
