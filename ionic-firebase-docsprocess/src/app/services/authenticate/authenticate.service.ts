import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) { }
  
  signUnWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
  }

  signInWithGoogle() {
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider())
  }

}
