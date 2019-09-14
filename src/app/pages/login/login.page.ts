import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild (IonSlides , {static: true}) slides: IonSlides;

  constructor(public keyboard: Keyboard) { }

  ngOnInit() {
  }

  segmentChanged(event){
    if(event.toElement.innerText === "LOGIN"){
      this.slides.slidePrev();
    } else{
      this.slides.slideNext();
    }
  }
}
