import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingListService {
   // ingredientAdded = new EventEmitter<Ingredient>();
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
      ingredients: Ingredient[] = [
        new Ingredient('Tomato', 5),
        new Ingredient('Onion', 7)
     ];

     getIngredients(index: number) {
       return this.ingredients[index];
     }

     OnIngredientAdded(IngredientReceive: Ingredient) {
        this.ingredients.push(IngredientReceive);
        this.ingredientChanged.next(this.ingredients);
      }

      AddIngredient(Ingredients:Ingredient[]) {
        this.ingredients.push(...Ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient:Ingredient) {
          this.ingredients[index] = newIngredient;
          this.ingredientChanged.next(this.ingredients.slice());
      }

      DeleteItem(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
      }
}