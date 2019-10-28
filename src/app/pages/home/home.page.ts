import { AuthService } from './../../services/auth.service';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { Subscription } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public recipes = new Array<Recipe>();
  private recipeSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    ) { 
    this.recipeSubscription = this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
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
}
