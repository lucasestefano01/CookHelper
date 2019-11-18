import { AuthService } from './../../services/auth.service';
import { User } from './../../interfaces/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController, LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  segmentChanged(event) {
    if (event.toElement.innerText === "LOGIN") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login() {
    await this.presentLoading();

    try{
      await this.authService.login(this.userLogin);
    } catch(error){
      this.presentToast(error.message);
    } finally{
      this.loading.dismiss();
    }


  }

  async register() {
    await this.presentLoading();

    try{
      await this.authService.register(this.userRegister);
    } catch(error){
      this.presentToast(error.message);
    } finally{
      this.loading.dismiss();
    }

    this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return await this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({message, duration: 2000});
    toast.present();
  }

}
