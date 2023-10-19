import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from './components/header/header.component';
import {ShoppingListComponent} from './components/shopping/components/shopping-list/shopping-list.component';
import {
  ShoppingListEditComponent
} from './components/shopping/components/shopping-list-edit/shopping-list-edit.component';
import {IngredientComponent} from './components/ingredient/ingredient.component';
import {RecipesComponent} from './components/recipe/recipes.component';
import {RecipeListComponent} from './components/recipe/components/list/recipe-list.component';
import {RecipeItemComponent} from './components/recipe/components/item/recipe-item.component';
import {RecipeDetailComponent} from './components/recipe/components/detail/recipe-detail.component';
import {DropdownDirective} from './directives/dropdown.directive';
import {RecipeEditComponent} from './components/recipe/components/edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipe/components/recipe-start/recipe-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    IngredientComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
