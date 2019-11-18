import { Ingredient } from './../interfaces/ingredient';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeCollections: AngularFirestoreCollection<Recipe>;
  private ingredientesCollection:AngularFirestoreCollection<Ingredient>;

  constructor(private afs: AngularFirestore) {
    this.recipeCollections = this.afs.collection<Recipe>('Receitas');
    this.ingredientesCollection = this.afs.collection<Ingredient>('Ingredientes');
   }

   getRecipes() {
      return this.recipeCollections.snapshotChanges().pipe(
        map(actions =>{
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;

            return{ id, ...data }
          });
        })
      );
   }

   addRecipe(recipe: Recipe){
    return this.recipeCollections.add(recipe);
   }

   getRecipe(id: string) {
    return this.recipeCollections.doc<Recipe>(id).valueChanges();
  }

  getIngredientes(){
    return this.ingredientesCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{ id, ...data }
        });
      })
    );
  }
}
