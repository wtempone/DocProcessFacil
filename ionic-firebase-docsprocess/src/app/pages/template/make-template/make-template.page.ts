import { Component, OnDestroy, OnInit } from '@angular/core';
import DecoupledEditor from '../../../../../src/plugins/ckeditor5-custom-build';
import { AlertController, LoadingController, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { tipificacoes, packs } from './mock-template';
import { of } from 'rxjs';
import { filter, map, first } from 'rxjs/operators';
import { SaveTemplateComponent } from '../save-template/save-template.component';
import { TemplateLocalService } from 'src/app/services/template/template-local.service';
import { RequiredDocs, Template } from 'src/app/models/template.model';
import { TemplateRemoteService } from 'src/app/services/template/template-remote.service';
import { ActivatedRoute } from '@angular/router';
import { DocsRequireEditComponent } from './docs-require-edit/docs-require-edit.component';
import { RequireDocsRemoteService } from 'src/app/services/require-docs/require-docs-remote.service';
import { DocExtractionComponent } from './doc-extraction/doc-extraction.component';
import { ExtractionLocalService } from 'src/app/services/estraction/extraction-local.service';
import { AnyNsRecord } from 'dns';
import { DocReviewComponent } from './doc-review/doc-review.component';

@Component({
  selector: 'app-make-template',
  templateUrl: './make-template.page.html',
  styleUrls: ['./make-template.page.scss'],
})
export class MakeTemplatePage implements OnInit, OnDestroy {
  public editor: DecoupledEditor
  public template: Template
  public tipifications: any
  public packs: any
  public requiredsDocs: RequiredDocs[]
  public selectedField: any
  public selectedPack: any
  public interval: any
  public panelTipifications: boolean;
  constructor(
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private templateLocalService: TemplateLocalService,
    private templateRemoteService: TemplateRemoteService,
    private actRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private requireDocsRemoteService: RequireDocsRemoteService,
    private loadingController: LoadingController,
    private extractionLocalService: ExtractionLocalService

  ) { }

  ngOnInit() {

    DecoupledEditor
      .create(document.querySelector('.document-editor__editable') as HTMLElement)
      .then((editor) => {
        const toolbarContainer = document.querySelector('.document-editor__toolbar') as HTMLElement;

        toolbarContainer.appendChild(editor.ui.view.toolbar.element!);

        this.editor = editor;
        const id = this.actRoute.snapshot.paramMap.get('id');

        if (id) {
          this.templateRemoteService.get(id).snapshotChanges().subscribe((item) => {
            this.template = item.payload.toJSON() as any;
            this.template.$key = item.key!;
            if (this.template.body) {
              this.editor.setData(this.template.body)
            }
          });

          this.requireDocsRemoteService.getByTemplateId(id).snapshotChanges().subscribe((res) => {
            this.requiredsDocs = [];
            res.forEach((item) => {
              const doc = item.payload.toJSON() as any;
              doc.$key = item.key!;
              this.requiredsDocs.push(doc);
            });
          });

        } else {
          this.template = new Template();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });

    this.aplyTipification();
    this.transformTipification();

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  toglePanelTipification(){
    this.panelTipifications = !this.panelTipifications;
  }
  showLoading() {
    this.loadingController.create({
      message: 'Enviando informações',
      cssClass: 'loader-css-class',
      backdropDismiss: false
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

  saveLocal() {
    this.templateLocalService.set(this.template);
    this.showMessage("Template salvo local...")
  }

  async editRequiredDocs(requiredDoc: RequiredDocs | null) {

    const modal = await this.modalCtrl.create({
      component: DocsRequireEditComponent
      , componentProps: {
        requiredDoc: requiredDoc
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.saveRequiredDoc(data);
    }

    if (role === 'delete') {
      this.showDeleteRequiredDocsOptions(data);
    }
  }
  async documentExtraction() {

    const modal = await this.modalCtrl.create({
      component: DocExtractionComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.decodeExtraction(data);
    }
  }

  async documentReview() {

    const modal = await this.modalCtrl.create({
      component: DocReviewComponent
      , componentProps: {
        tipifications: this.tipifications
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
    }
  }

  decodeExtraction(data: any) {
    console.log("decodeExtraction:", data);
    if (data.status.message !== "Ok") {
      this.showMessage("Ocorreu um erro na extração das informações do arquivo: " + JSON.stringify(data.status.errors));
      return;
    }
    this.extractionLocalService.set([data]);
    this.aplyTipification();
  }
  aplyTipification() {
    const results = this.extractionLocalService.get();
    if (results) {
      var tipifications = JSON.parse(results)
      this.tipifications = tipifications;
    }
    this.documentReview() 
  }
  saveRequiredDoc(doc: RequiredDocs) {
    doc.templateId = this.template.$key;
    if (doc.$key) {
      this.requireDocsRemoteService.update(doc.$key, doc);
    } else {
      this.requireDocsRemoteService.create(doc);
    }
  }


  async saveTamplate() {

    if (this.template.$key) {
      this.save(this.template);
    } else {
      const modal = await this.modalCtrl.create({
        component: SaveTemplateComponent
        , componentProps: {
          template: this.template
        }
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.save(data);
      }

    }

  }

  save(data: Template) {
    this.template.name = data.name;
    this.template.description = data.description || '';
    this.template.body = this.editor.getData();

    if (this.template.$key) {
      const template = this.templateRemoteService.update(this.template.$key, this.template).then(() => {
        this.templateLocalService.delete();
      });
    } else {
      const template = this.templateRemoteService.create(this.template).then((ref) => {
        this.templateLocalService.delete();
        this.template.$key = ref.key!;
      });
    }
    this.showMessage("Template salvo", "success")
  }

  transformTipification() {
    of(packs)
      .subscribe((val) => {
        this.packs = val.packs;
      });
  }

  changePack(p: any) {
    this.selectedPack = p;
    this.aplyPack();
  }

  aplyPack() {
    var data = this.editor.getData();
    this.tipifications = this.selectedPack.tipificacoes;

    const parser = new DOMParser();
    const html = parser.parseFromString(data, 'text/html');
    var externalFields = html.getElementsByName('external-data');

    for (let i = 0; i < externalFields.length; i++) {
      let element = externalFields[i];
      var path = element.getAttribute('data-resource-url');
      if (path) {
        var fieldDefs = this.getFieldByPath(path);
        element.setAttribute('value', fieldDefs.value);
      }
    }
    this.editor.setData(html.body.innerHTML);
  }

  getFieldByPath(path: string) {
    var fieldReturn = null;
    var params = path.split('.');
    params.map(x => x.split('[')[0].split(']')[0]);

    for (let tipification of this.tipifications) {
      for (let page of tipification.result) {
        for (let field of page.fields) {
          if (field.name == params[1]) {
            fieldReturn = field;
          }
          if (fieldReturn != null) break;
        }
        if (fieldReturn != null) break;
      }
      if (fieldReturn != null) break;
    }
    return fieldReturn;
  }

  getTag(tags: string[], type: string) {
    return tags.filter(tag => tag.indexOf(type) !== -1)
      .map((x) => x.split('=')[1])[0]
  }

  insertField(field: any, documentType: string) {

    this.selectedField = field;
    this.editor.editing.view.focus();
    if (field) {
      this.editor.execute('external',
        {
          "path": `${documentType}.${field.name}`,
          "field": field,
        }
      );
    }

  }

  openInfoMenu() {
    this.menuCtrl.enable(true, 'info-menu');
    this.menuCtrl.open('info-menu');
  }
  openPackMenu() {
    this.menuCtrl.enable(true, 'pack-menu');
    this.menuCtrl.open('pack-menu');
  }
  openDocsRequired() {
    this.menuCtrl.enable(true, 'docs-required-menu');
    this.menuCtrl.open('docs-required-menu');
  }
  async showMessage(message: string, type?: string, position: "top" | "bottom" | "middle" = "bottom") {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: position,
      color: type
    });
    toast.present();
  }


  async showCloseOptions() {
    if (this.templateLocalService.get()) {

      const alert = await this.alertCtrl.create({
        header: 'Fechar template?',
        message: 'Você possui alterações não salvas. Deseja sair sem salvar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Sair sem salvar?',
            cssClass: 'secondary',
            role: 'confirm',
            handler: () => {
              this.templateLocalService.delete();
              this.navCtrl.navigateRoot("/home/home-template");
            }
          }
        ]
      });
      await alert.present();
    }
    else {
      this.navCtrl.navigateRoot("/home/home-template");
    }
  }



  async showDeleteRequiredDocsOptions(doc: RequiredDocs) {
    const alert = await this.alertCtrl.create({
      header: 'Deseja excluir o documento?',
      message: `Deseja excluir o documento '${doc.name}'?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Excluir',
          cssClass: 'danger',
          role: 'confirm',
          handler: () => {
            this.requireDocsRemoteService.delete(doc.$key);
          }
        }
      ]
    });
    await alert.present();

  }
}
