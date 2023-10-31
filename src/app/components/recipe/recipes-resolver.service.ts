import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RecipeModel} from '../../shared/models/recipe.model';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {RecipesService} from './recipes.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<RecipeModel[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes: RecipeModel[] = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
