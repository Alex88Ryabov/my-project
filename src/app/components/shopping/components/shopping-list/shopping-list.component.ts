import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../../../../models/ingredient.model";
import {ShoppingService} from "../../shopping.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: IngredientModel[];
  private subscription$: Subscription;

  constructor(private shoppingService: ShoppingService) {
  }

  public ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients;
    this.subscription$ = this.shoppingService.ingredientsChanged$
      .subscribe((ingredients: IngredientModel[]) => this.ingredients = ingredients);
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


  public onEditItem(index: number): void {
    this.shoppingService.startedEditing$.next(index);
  }
}
