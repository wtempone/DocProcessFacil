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
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
    })
  }
  validations = {
    'email': [
      { type: 'required', message: 'Informe seu e-mail' },
      { type: 'minlength', message: 'Seu e-mail deve ter no mínimo 3 caracteres' },
      { type: 'email', message: 'Informe um e-mail válido' },
    ],
    'password': [
      { type: 'required', message: 'Informe sua senha' },
      { type: 'minlength', message: 'A senha deve ter no mínimo 8 caracteres' },
    ],
  };

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
        this.navCtrl.navigateRoot('home');
      })
      .catch((err) => {
        loading.dismiss();
        var erro = "";
        if (err.code) erro = this.authenticateService.verifyErroCode(err.code);
        this.showMessage(erro, "danger");
      });
  }

  async signInWithGoogle() {
    this.authenticateService.signInWithGoogle()
      .then((data) => {
        if (data.user) {
          this.userLocalService.set(new User(data.user.displayName, data.user.email, data.user.photoURL));
        }
        this.navCtrl.navigateRoot('home');
      })
      .catch((err) => {
        var erro = "";
        if (err.code) erro = this.authenticateService.verifyErroCode(err.code);
        this.showMessage(erro, "danger");
      });
  }

  async showMessage(message: string, type: string, position: "top" | "bottom" | "middle" = "bottom" ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: position,
      color: type
    });
    toast.present();
  }

  async goToSignup() {
    this.navCtrl.navigateForward('sign-up');
  }

  async goToResetPassord(){
    this.navCtrl.navigateForward('reset-password');
  }
}