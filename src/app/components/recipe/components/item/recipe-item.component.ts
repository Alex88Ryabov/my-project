import {Component, Input} from '@angular/core';
import {RecipeModel} from "../../../../shared/models/recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() public recipe: RecipeModel;
  @Input() public index: number;

}
