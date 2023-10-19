import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../../../models/recipe.model";
import {RecipeService} from "../../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: RecipeModel[];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes;
  }

  public openNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route}).finally();
  }
}
