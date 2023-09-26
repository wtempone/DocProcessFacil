import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.page.html',
  styleUrls: ['./home-template.page.scss'],
})
export class HomeTemplatePage implements OnInit {

  constructor(
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
  }

  newTemplate(){
    this.navCtrl.navigateRoot("/home/home-template/make-template");
  }
}
