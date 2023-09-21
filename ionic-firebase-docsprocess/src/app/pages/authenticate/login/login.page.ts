import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { UserLocalService } from 'src/app/services/user/user-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authenticateService: AuthenticateService,
    private userLocalService: UserLocalService,
    private platform: Platform

  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();

    this.authenticateService.signInWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then((data) => {
        loading.dismiss();
        // TODO salvar nome e imagem e depois ler
        if (data.user) {
          this.userLocalService.set(new User('', data.user.email, ''));
        }
        this.navCtrl.navigateRoot('home-post');
      })
      .catch((err) => {
        console.log(err);
        loading.dismiss();
        this.showMessage("Usuário ou senha inválidos");
      });
  }

  async signInWithGoogle() {
    this.authenticateService.signInWithGoogle()
      .then((data) => {
        console.log(data);
        if (data.user) {
          this.userLocalService.set(new User(data.user.displayName, data.user.email, data.user.photoURL));
        }
        this.navCtrl.navigateRoot('home-post');
      })
      .catch((err) => {
        this.showMessage("Usuário ou senha inválidos");
      });
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({ message: message, duration: 3000 });
    toast.present;
  }

  async goToSignup() {
    this.navCtrl.navigateForward('sign-up');
  }
}