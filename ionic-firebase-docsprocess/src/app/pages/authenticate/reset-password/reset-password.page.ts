import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { UserRemoteService } from 'src/app/services/user/user-remote.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authenticateService: AuthenticateService,
    private userRemoteService: UserRemoteService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ])],
    })
  }
  validations = {
    'email': [
      { type: 'required', message: 'Informe seu e-mail' },
      { type: 'minlength', message: 'Seu e-mail deve ter no mínimo 3 caracteres' },
      { type: 'email', message: 'Informe um e-mail válido' },
    ]
  };

  ngOnInit() {
  }


  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Verificando e-mail para envio..." });
    loading.present();

    this.userRemoteService.getByEmail(this.form.controls['email'].value).subscribe(data => {
      if (data.length > 0) {
        var user = data[0] as User;
        debugger
        this.authenticateService.sendPasswordResetEmail(user.email!)
          .then(() => {
            this.showMessage("Foi enviado uma mensagem com um link para alteração de sua senha, acesse seu e-mail e siga as instruções.", "success");
            loading.dismiss();
            this.navCtrl.navigateRoot('login');
          })
          .catch((err) => {
            loading.dismiss();
            var erro = "";
            if (err.code) erro = this.authenticateService.verifyErroCode(err.code);
            loading.dismiss();
            this.showMessage("Não foi possível enviar o email. " + erro, "danger");
          });
      } else {
        loading.dismiss();
        this.showMessage("E-mail não foi encontrado no cadastro. " , "danger");
      }
    });

  }

  async showMessage(message: string, type: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: type,
    });
    toast.present();
  }

  async cancel() {
    this.navCtrl.navigateBack('login');
  }
}
