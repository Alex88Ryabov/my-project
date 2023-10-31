import {Component, OnInit} from '@angular/core';
import {RecipeModel} from '../../../../shared/models/recipe.model';
import {RecipesService} from '../../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {DataStorageService} from '../../../../shared/services/data-storage.service';

@UntilDestroy()
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipes: RecipeModel[];

  constructor(
    private recipeService: RecipesService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.recipeService.recipesChanged$.pipe(untilDestroyed(this)).subscribe((recipes: RecipeModel[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  public openNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route}).finally();
  }
}
