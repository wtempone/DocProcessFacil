import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { PostLocalService } from 'src/app/services/post/post-local.service';
import { PostRemoteService } from 'src/app/services/post/post-remote.service';
import { UserLocalService } from 'src/app/services/user/user-local.service';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.page.html',
  styleUrls: ['./home-post.page.scss'],
})
export class HomePostPage implements OnInit {
  posts: Observable<any[]>;
  public user: User = new User('', '', 'https://placehold.it/80', null);

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private postLocalService: PostLocalService,
    private postRemoteService: PostRemoteService,
  ) { }

  ngOnInit() {
    const img = this.postLocalService.get();
    if (img) this.showMessage("Você tem uma publicação não salva");
    this.posts = this.postRemoteService.getList().valueChanges();
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message, duration: 3000, buttons: [
        {
          icon: "send",
          handler: () => {
            this.navCtrl.navigateForward("/home-post/make-post");
          }
        }
      ]
    });
    toast.present();
  }

  
}
