import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  RecipeSel:Recipe;
  id: number;
  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.RecipeSel = this.recipeService.getRecipeId(this.id);
        }
      );
  }
   
  OnAddToShoppingList() {
     this.recipeService.AddIngredientToShoppingList(this.RecipeSel.ingredients);
  }

  OnEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  OnDeleterecipe() {
    this.recipeService.deleteRecipe(this.id);
    // this.router.navigate(['../'], { relativeTo: this.route });
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }

}
