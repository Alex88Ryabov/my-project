import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {authGuard} from "../auth/auth.guard";
import {RecipeStartComponent} from "./components/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./components/edit/recipe-edit.component";
import {RecipeDetailComponent} from "./components/detail/recipe-detail.component";
import {RecipesResolverService} from "./recipes-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
