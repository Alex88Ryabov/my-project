import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: () => import('./components/recipe/recipes.module').then((m) => m.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('./components/shopping/shopping.module').then((m) => m.ShoppingModule)},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
