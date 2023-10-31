import {Injectable} from '@angular/core';
import {RecipesService} from '../../components/recipe/recipes.service';
import {RecipeModel} from '../models/recipe.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@UntilDestroy()
@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
  ) {}

  public storeRecipes() {
    const recipes: RecipeModel[] = this.recipeService.getRecipes();
    const url = 'https://my-first-recipe-book-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

    this.http.put(url, recipes).pipe(untilDestroyed(this)).subscribe();
  }

  public fetchRecipes(): Observable<RecipeModel[]> {
    const url = 'https://my-first-recipe-book-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
    return this.http
      .get<RecipeModel[]>(url)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        }),
      );
  }
}
