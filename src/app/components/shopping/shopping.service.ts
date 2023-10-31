import {Injectable} from '@angular/core';
import {IngredientModel} from "../../shared/models/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  public ingredientsChanged$: Subject<IngredientModel[]> = new Subject<IngredientModel[]>();
  public startedEditing$: Subject<number> = new Subject<number>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  public get getIngredients(): IngredientModel[] {
    return this.ingredients.slice();
  }

  public getIngredient(index: number): IngredientModel {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: IngredientModel[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  public updateIngredient(index: number, newIngredient: IngredientModel): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  public deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  public saveIngredient(ingredientName: string, ingredientAmount: number): void {
    const newIngredient = new IngredientModel(ingredientName, ingredientAmount);
    this.ingredients.push(newIngredient);
  }
}
