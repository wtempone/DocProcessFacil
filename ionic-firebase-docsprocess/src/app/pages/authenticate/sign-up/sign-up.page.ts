import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { ErrorMessagesService } from 'src/app/services/shared/error-messages.service';

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
    private authenticateService: AuthenticateService,
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
    const loading = await this.loadingCtrl.create({ message: "Cadastrando..." });
    loading.present();

    this.authenticateService.signUnWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then((data) => {
        this.showMessage("Seu cadastro foi realizado com sucesso. Bem-vindo! Efetue seu login.", "success", "middle");
        loading.dismiss();
        this.navCtrl.navigateRoot('login');
      })
      .catch((err) => {
        loading.dismiss();
        var erro = "";
        if (err.code) erro = this.authenticateService.verifyErroCode(err.code);
        this.showMessage("Não foi possível realizar seu cadastro. " + erro, "danger");
      });
  }

  async showMessage(message: string, type: string,  position: "top" | "bottom" | "middle" = "bottom") {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: position,
      color: type,
    });
    toast.present();
  }

  async cancel() {
    this.navCtrl.navigateBack('login');
  }
}