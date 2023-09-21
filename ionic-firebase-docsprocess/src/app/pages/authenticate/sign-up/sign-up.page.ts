import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authenticateService: AuthenticateService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {

  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Cadastrando..." });
    loading.present();

    this.authenticateService.signUnWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then((data) => {
        this.showMessage("Bem-vindo!");
        loading.dismiss();
        this.navCtrl.navigateRoot('login');
      })
      .catch((err) => {
        loading.dismiss();
        this.showMessage("Não foi possível realizar seu cadastro");
      });
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({ message: message, duration: 3000});
    toast.present;
  }

  async cancel() {
    this.navCtrl.navigateBack('login');
  }
}