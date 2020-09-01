import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscripton: Subscription;
 
  constructor(private recipeService:RecipeService,
              private router:Router,
              private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscripton = this.recipeService.recipesChangd
    .subscribe(
      (recipes: Recipe[]) => {
          this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipe();
  }

  ngOnDestroy() {
     this.subscripton.unsubscribe();
  }

  OnNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.rout})
  }

}
