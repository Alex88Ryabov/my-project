import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingService} from "../../shopping.service";
import {NgForm} from "@angular/forms";
import {IngredientModel} from "../../../../shared/models/ingredient.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('shopEditForm') shopEditForm: NgForm;
  @Output() ingredientAdded: EventEmitter<{ name: string, amount: number }> = new EventEmitter<{
    name: string,
    amount: number
  }>();
  public editMode: boolean = false;
  public editedItemIndex: number;
  public editedItem: IngredientModel;


  constructor(private shoppingService: ShoppingService) {
  }

  public ngOnInit() {
    this.shoppingService.startedEditing$
      .pipe(untilDestroyed(this))
      .subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.shopEditForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    })
  }

  public onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient: IngredientModel = new IngredientModel(value.name, value.amount);

    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    form.reset();
  }

  public onDelete(): void {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  public onClear(): void {
    this.shopEditForm.reset();
    this.editMode = false;
  }
}
