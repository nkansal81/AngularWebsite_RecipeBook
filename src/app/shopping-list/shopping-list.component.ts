import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private shoppingSubscription: Subscription;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    this.shoppingSubscription = this.shoppingListService.ingredientChanged.subscribe(
     (ingredient:Ingredient[]) => {this.ingredients = ingredient}
    );
  }

  OnEditItem(index: number) {
     this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.shoppingSubscription.unsubscribe();
  }

}
