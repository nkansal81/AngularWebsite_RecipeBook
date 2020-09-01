import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    // public recipeSelected = new Subject<Recipe>();
    recipesChangd = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Big Fat Burger with Fries' , 
            'What else you need to say?' , 
            'https://www.fatburgercanada.com/wp-content/uploads/2018/09/fb18_FatCheeseBeer.png',
            [
                new Ingredient('Buns',2),
                new Ingredient('cheese',1)
            ]
            ),
        new Recipe(
            'Tasty Schnitzel' , 
            'A super tasty Schnitzel - just awesome!' , 
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
                new Ingredient('French Fries', 1),
                new Ingredient('Aloo Tikki',1)
            ]
            )
      ];

      constructor(private shoppingService:ShoppingListService) {

      }

      getRecipe() {
          return this.recipes.slice();
      }

      getRecipeId(index: number) {
          return this.recipes[index];
      }

      AddIngredientToShoppingList(ingredient:Ingredient[]) {
        this.shoppingService.AddIngredient(ingredient);
      }

      addrecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipesChangd.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChangd.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index,1);
          this.recipesChangd.next(this.recipes.slice());
      }
}