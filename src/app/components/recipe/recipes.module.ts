import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './components/list/recipe-list.component';
import {RecipeItemComponent} from './components/item/recipe-item.component';
import {RecipeDetailComponent} from './components/detail/recipe-detail.component';
import {RecipeEditComponent} from './components/edit/recipe-edit.component';
import {RecipeStartComponent} from './components/recipe-start/recipe-start.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [RecipesComponent, RecipeListComponent, RecipeItemComponent, RecipeDetailComponent, RecipeEditComponent, RecipeStartComponent],
  imports: [RouterModule, ReactiveFormsModule, RecipesRoutingModule, SharedModule],
})
export class RecipesModule {}
