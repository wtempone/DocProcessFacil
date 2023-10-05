import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage, AngularFireUploadTask,  } from '@angular/fire/compat/storage';
import { AngularFireFunctions  } from '@angular/fire/compat/functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RequiredDocs } from 'src/app/models/template.model';
import { LoadingController } from '@ionic/angular';

AngularFireModule
@Component({
  selector: 'app-docs-require-edit',
  templateUrl: './docs-require-edit.component.html',
  styleUrls: ['./docs-require-edit.component.scss'],
})
export class DocsRequireEditComponent implements OnInit {
  public form: FormGroup;
  isHovering: boolean;
  file: File;
  public progress: Observable<number | undefined>;
  public task: AngularFireUploadTask
  snapshot: Observable<any>;
  downloadURL: string;
  requiredDoc: RequiredDocs
  loader: any;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private storage: AngularFireStorage,
    private functions: AngularFireFunctions,
    private loadingCtrl: LoadingController
  ) {


  }

  ngOnInit(): void {
    this.requiredDoc = this.navParams.get('requiredDoc') as RequiredDocs || new RequiredDocs();
    this.form = this.fb.group({
      name: [this.requiredDoc ? this.requiredDoc.name : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      description: [this.requiredDoc ? this.requiredDoc.description : '', Validators.compose([])],
      urlFile: [this.requiredDoc ? this.requiredDoc.urlFile : '', Validators.compose([])],
    })
  }

  async showLoading(message:string) {
    this.loader = await this.loadingCtrl.create({
      message: message,
    });

    this.loader.present();
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
    this.requiredDoc.extension = this.getExtension(this.file.name!);
    this.getBase64(this.file);

  }

  onFileSelected(event: any) {
    if (event.target.files.length > 1) {
      this.showMessage("Selecione apenas um arquivo por vez", "danger");
      return;
    }
    this.file = event.target.files[0];
    this.requiredDoc.extension = this.getExtension(this.file.name!);
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
      this.requiredDoc.urlFile = reader.result as any;
    };

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

  excluir(){
    return this.modalCtrl.dismiss(this.requiredDoc, 'delete');
  }
  toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  confirm() {
    if (this.form.valid) {
      this.requiredDoc.name = this.form.value.name;
      this.requiredDoc.description = this.form.value.description;
      
      if (this.file) {

        const filePath = `dosc-required/${Date.now()}_${this.file.name}`;
        this.task = this.storage.upload(filePath, this.file);
        this.progress = this.task.percentageChanges();

        return this.task.then((data) => {
          const ref = this.storage.ref(data.metadata.fullPath);
          ref.getDownloadURL().subscribe((url) => {
            this.requiredDoc.urlFile = url;
            this.form.controls['urlFile'].setValue(url);

            this.toBase64(this.file).then((base64) => {
              const regex = /data:.*base64,/
              const contentBase64 =  (base64 as string).replace(regex,"")

              const callable = this.functions.httpsCallable('docExtractionByURL');
              const obs = callable({
                file: contentBase64
              });
              debugger
              obs.subscribe(async res => {
                this.form.controls['urlFile'].setValue(url);
                console.log('Retorno da função: ',res)
                return this.modalCtrl.dismiss(this.requiredDoc, 'confirm');
              });
  
            })            
          });
        });
      } else {
        return this.modalCtrl.dismiss(this.requiredDoc, 'confirm');
      }
    } else {
      this.showMessage("Dados incompletos", "danger");
      return;
    }
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
