import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '.././recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route:ActivatedRoute, 
    private recipeService:RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
     (params: Params) => {
       this.id = +params['id']; // Giving the parameter 'id' in params beacuse that is the same path given in routing-module
       this.editMode = params['id'] != null;
       this.initForm();
     }
    );
  }

  OnSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
       if(this.editMode) {
         this.recipeService.updateRecipe(this.id, newRecipe);
       } else {
         this.recipeService.addrecipe(this.recipeForm.value);
       }
       this.OnCancel();
    
  }

  OnCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  OnDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  OnAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,
          [Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipeId(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, 
                [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
  
    }

    this.recipeForm = new FormGroup({
       'name' : new FormControl(recipeName, Validators.required),
       'imagePath' : new FormControl(recipeImagePath, Validators.required),
       'description': new FormControl(recipeDescription, Validators.required),
       'ingredients': recipeIngredients
    });
    // get controls() { // a getter!
    //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
    // }
  }

}
