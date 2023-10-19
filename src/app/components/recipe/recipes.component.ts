import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  private subscription$: Subscription;

  constructor() {
  }

  public ngOnInit(): void {
  }
}
