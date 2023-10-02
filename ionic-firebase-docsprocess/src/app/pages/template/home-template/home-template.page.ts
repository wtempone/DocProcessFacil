import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Template } from 'src/app/models/template.model';
import { TemplateLocalService } from 'src/app/services/template/template-local.service';
import { TemplateRemoteService } from 'src/app/services/template/template-remote.service';
import { UserLocalService } from 'src/app/services/user/user-local.service';

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.page.html',
  styleUrls: ['./home-template.page.scss'],
})
export class HomeTemplatePage implements OnInit {
  public templates: any = [];

  constructor(
    private navCtrl: NavController,
    private templateLocalService: TemplateLocalService,
    private templateRemoteService: TemplateRemoteService,
    private userLocalService: UserLocalService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    const img = this.templateLocalService.get();
    if (img) this.showMessage("Você tem uma publicação não salva");
    const user =  this.userLocalService.get();
    if (user) {
      const userObj = JSON.parse(user);
    let templatesRes = this.templateRemoteService.getByUser(userObj.$key);
    
    templatesRes.snapshotChanges().subscribe((res) => {
      this.templates = [];
      res.forEach((item) => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        this.templates.push(a as Template);
      });
    });
  }

  }
  fetchTemplates() {
    this.templateRemoteService
      .getList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }
  newTemplate() {
    this.navCtrl.navigateRoot("/home/home-template/make-template");
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
}
