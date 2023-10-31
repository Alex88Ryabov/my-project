import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './components/shopping-list/shopping-list.component';
import {ShoppingListEditComponent} from './components/shopping-list-edit/shopping-list-edit.component';
import {ShoppingRoutingModule} from './shopping-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [ShoppingRoutingModule, FormsModule, SharedModule],
})
export class ShoppingModule {}
