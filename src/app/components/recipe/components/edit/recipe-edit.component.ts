import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../../recipes.service';
import {RecipeModel} from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode: boolean = false;
  public recipeForm: FormGroup = new FormGroup({});
  public isReady: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    });
  }

  private initForm(): void {
    let recipeName = '';
    let imagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe: RecipeModel = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            }),
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
    this.isReady = true;
  }

  public onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      if (!this.recipeForm.value['ingredients']) {
        this.recipeForm.value['ingredients'] = [];
      }
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  public get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  public onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      }),
    );
  }

  public onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route}).finally();
  }

  public onDeleteIngredient(index: number): void {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.removeAt(index);
  }
}
