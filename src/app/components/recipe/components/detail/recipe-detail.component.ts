import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../../../models/recipe.model";
import {IngredientModel} from "../../../../models/ingredient.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: RecipeModel;
  public id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  public onAddToShopingList(ingredients: IngredientModel[]): void {
    this.recipeService.setIngredients = ingredients;
  };

  public onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route}).finally();
  }
}
