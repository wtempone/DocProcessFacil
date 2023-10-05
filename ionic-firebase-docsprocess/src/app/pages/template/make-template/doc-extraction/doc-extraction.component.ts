import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage, AngularFireUploadTask, } from '@angular/fire/compat/storage';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RequiredDocs } from 'src/app/models/template.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-doc-extraction',
  templateUrl: './doc-extraction.component.html',
  styleUrls: ['./doc-extraction.component.scss'],
})
export class DocExtractionComponent implements OnInit {

  protected isHovering: boolean;
  protected loader: any;
  protected extension: string;

  public file: File;
  public url: string;
  public progress: Observable<number | undefined>;
  public task: AngularFireUploadTask

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private storage: AngularFireStorage,
    private functions: AngularFireFunctions,
    private loadingController: LoadingController
  ) {


  }

  ngOnInit(): void {
  }

  showLoading() {
    this.loadingController.create({
      message: 'Enviando informações',
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }   
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    if (files.length > 1) {
      this.showMessage("Arraste apenas um arquivo por vez", "danger");
      return;
    }
    this.file = files[0];
    this.extension = this.getExtension(this.file.name!);
    this.getBase64(this.file);

  }

  onFileSelected(event: any) {
    if (event.target.files.length > 1) {
      this.showMessage("Selecione apenas um arquivo por vez", "danger");
      return;
    }
    this.file = event.target.files[0];
    this.extension = this.getExtension(this.file.name!);
    this.getBase64(this.file);
  }

  getExtension(src: string) {
    const ext = src.split('?');
    if (ext.length > 0) {
      return ext[0].substring(src.lastIndexOf(".") + 1)
    } else {
      return src.substring(src.lastIndexOf(".") + 1)
    }
  }

  getBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return reader.onload = () => {
      this.file = file;
      this.url = reader.result as any;
    };

  }

  toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  confirm() {
    if (this.file) {
      this.showLoading();
      this.toBase64(this.file).then((base64) => {
        const regex = /data:.*base64,/
        const contentBase64 = (base64 as string).replace(regex, "")

        const callable = this.functions.httpsCallable('docExtractionByURL');
        const obs = callable({
          file: contentBase64
        });
        obs.subscribe(async res => {
          this.dismissLoader();
          return this.modalCtrl.dismiss(res, 'confirm');
        });
      });
    } else {
      this.showMessage("Arquivo não informado", "danger");
      return;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async showMessage(message: string, type: string, position: "top" | "bottom" | "middle" = "bottom") {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: position,
      color: type
    });
    toast.present();
  }

}
