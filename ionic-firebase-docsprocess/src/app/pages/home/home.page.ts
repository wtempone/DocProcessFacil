import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { filter, map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserLocalService } from 'src/app/services/user/user-local.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selectedPath = '';
  pages = [
    {
      title: 'Posts',
      url: 'home-post',
      icon: 'newspaper-outline'
    },
    {
      title: 'Appointments',
      url: 'home-appointment',
      icon: 'person'
    }
  ];

  settingsPage = [

    {
      title: 'Teste',
      url: 'teste',
      icon: 'person'
    }
  ];
  public user: User = new User('', '', 'https://placehold.it/80');

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private userLocalService: UserLocalService,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
  ) {
    var user = this.userLocalService.get();
    if (user) this.user = JSON.parse(user);
    this.router.events.pipe(
      map((event: any) => event.routerEvent as RouterEvent),
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event)=>{
      console.log('evento => ', event.url)
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

  openMainMenu() {
    this.menuCtrl.open('main-menu');
  }
  openSettingsMenu()  {
    this.menuCtrl.open('settings-menu');
  }

  async showCloseOptions() {
    const alert = await this.alertCtrl.create({
      header: 'Sair do Aplicativo?',
      message: 'Deseja sair do aplicativo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sair',
          cssClass: 'secondary',
          role: 'confirm',
          handler: () => {
            this.userLocalService.delete();
            this.navCtrl.navigateRoot("/login");          }
        }
      ]
    });
    await alert.present();
  }

}
