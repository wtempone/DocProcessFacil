import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController, ToastController, NavParams  } from '@ionic/angular';
import { Template } from 'src/app/models/template.model';

@Component({
  selector: 'app-save-template',
  templateUrl: './save-template.component.html',
  styleUrls: ['./save-template.component.scss'],
})
export class SaveTemplateComponent {
  public form: FormGroup;

  @ViewChild(IonModal) modal: IonModal;
  template: Template
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navParams: NavParams

  ) {
    this.template = this.navParams.get('template')
    this.form = this.fb.group({
      name: [this.template ? this.template.name : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      description: [this.template ? this.template.description : '', Validators.compose([
      ])],
    })
  }
  
  validations = {
    'name': [
      { type: 'required', message: 'Informe um nome para o template' },
      { type: 'minlength', message: 'O nome do tempate deve ter no mínimo 3 caracteres' },
    ]
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.form.valid) {
      return this.modalCtrl.dismiss(this.form.value, 'confirm');
    } else {
      this.showMessage("Arquivo não salvo", "danger");
      return;
    }
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

}
