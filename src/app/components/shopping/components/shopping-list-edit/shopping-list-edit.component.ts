import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingService} from "../../shopping.service";
import {NgForm} from "@angular/forms";
import {IngredientModel} from "../../../../models/ingredient.model";
import {Subscription} from "rxjs";

// @ts-ignore
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('shopEditForm') shopEditForm: NgForm;
  @Output() ingredientAdded: EventEmitter<{ name: string, amount: number }> = new EventEmitter<{
    name: string,
    amount: number
  }>();
  private subscription$: Subscription;
  public editMode: boolean = false;
  public editedItemIndex: number;
  public editedItem: IngredientModel;


  constructor(private shoppingService: ShoppingService) {
  }

  public ngOnInit() {
    this.subscription$ = this.shoppingService.startedEditing$.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.shopEditForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    })
  }

  public ngOnDestroy() {
    this.subscription$.unsubscribe();
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
