import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
   @ViewChild('f') slForm: NgForm; 
   subscription: Subscription;
   editMode = false;
   editedItemIndex: number;
   editedItem: Ingredient;

  constructor(private shoppingEditService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingEditService.startedEditing
       .subscribe(
         (index: number) => {
            this.editMode = true;
            this.editedItemIndex = index;
            this.editedItem = this.shoppingEditService.getIngredients(index);
            this.slForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount

            });
         }
       );
  }
  
  OnSubmit(form: NgForm) {
    const value = form.value;
    const IngredientCombine = new Ingredient(value.name,value.amount);
    if(this.editMode) {
      this.shoppingEditService.updateIngredient(this.editedItemIndex, IngredientCombine);
    } else {
      this.shoppingEditService.OnIngredientAdded(IngredientCombine);
    }
    this.editMode = false;
    form.reset();
    // this.ingredientAdded.emit(IngredientCombine);
   // this.shoppingEditService.ingredientAdded.emit(IngredientCombine);
  }

  OnClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  OnDelete() {
    this.shoppingEditService.DeleteItem(this.editedItemIndex);
    this.OnClear();
  }

  ngOnDestroy() {

  }
}
