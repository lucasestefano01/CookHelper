import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private recipeId: string = null;
  public recipe: Recipe = {};
  private loading: any;
  private recipeSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.recipeId = this.activatedRoute.snapshot.params['id'];

    if (this.recipeId) this.loadProduct();
  }

  ngOnInit() {
  }

  loadProduct() {
    this.recipeSubscription = this.recipeService.getRecipe(this.recipeId).subscribe(data => {
      this.recipe = data;
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
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
