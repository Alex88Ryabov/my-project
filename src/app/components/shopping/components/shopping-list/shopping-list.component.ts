import {Component, OnInit} from '@angular/core';
import {IngredientModel} from "../../../../shared/models/ingredient.model";
import {ShoppingService} from "../../shopping.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {LoggingService} from "../../../../logging.service";

@UntilDestroy()
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: IngredientModel[];

  constructor(private shoppingService: ShoppingService, private loggingService: LoggingService) {
  }

  public ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients;
    this.shoppingService.ingredientsChanged$
      .pipe(untilDestroyed(this))
      .subscribe((ingredients: IngredientModel[]) => this.ingredients = ingredients);

    this.loggingService.printLog('Hello from ShoppingListComponent');
  }


  public onEditItem(index: number): void {
    this.shoppingService.startedEditing$.next(index);
  }
}
