import { User } from './../interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user: User){
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User){
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    this.afa.auth.signOut();
  }

  getAuth(){
    return this.afa.auth;
  }
}
