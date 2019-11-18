import { map } from 'rxjs/operators';
import { Ingredient } from './../../interfaces/ingredient';
import { FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';
import { Recipe } from '../../interfaces/recipe';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public recipes = new Array<Recipe>();
  public ingredientes = new Array<Ingredient>();
  private recipeSubscription: Subscription;
  private ingredientSubscription: Subscription;
  public racas: string;
  public filteredRecipes = new Array<Recipe>();
  public filteredIngredients: any;
  public alala: any

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {
    this.recipeSubscription = this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
      this.filteredRecipes = this.recipes;
    });
    this.ingredientSubscription = this.recipeService.getIngredientes().subscribe(data => {
      this.ingredientes = data;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  clearFilters() {
    this.filteredRecipes = this.recipes;
    this.filteredIngredients = [];
    this.racas = "Todas";
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async logOut() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  filterItems(racas: string) {
    let value = (<HTMLInputElement>document.getElementById("racas")).value;
    if (value == "Todas") {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter(item => {
        return item.category == value;
      });
    }
  }

  teste() {
    const ingredientes = this.filteredIngredients;
    this.filteredRecipes = this.recipes;

    for(var d in ingredientes)
    {
      this.filteredRecipes = this.filteredRecipes.filter(x=> x.ingredientes && x.ingredientes.some(z => z === ingredientes[d]));
    }
  }
}
