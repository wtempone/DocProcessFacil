import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostLocalService } from 'src/app/services/post/post-local.service';
import { PostRemoteService } from 'src/app/services/post/post-remote.service';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.page.html',
  styleUrls: ['./make-post.page.scss'],
})
export class MakePostPage implements OnInit {

  public post: Post = new Post('', '', '');
  public filters: string[] = [];
  public progress: Observable<number | undefined>;
  public task: AngularFireUploadTask

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private postLocalService: PostLocalService,
    private postRemoteService: PostRemoteService,
    private storage: AngularFireStorage,

  ) {
    const data = this.postLocalService.get();
    if (data) this.post = JSON.parse(data);

    this.filters.push('filter-normal');
    this.filters.push('filter-1977');
    this.filters.push('filter-aden');
    this.filters.push('filter-gingham');
    this.filters.push('filter-ginza');
    this.filters.push('filter-moon');
    this.filters.push('filter-reyes');
    this.filters.push('filter-willow');
  }
  ngOnInit() {
  }
  getLocation() {
    // https://www.google.com/maps/{{ this.post.location }}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.post.location = `${position.coords.latitude},${position.coords.longitude}`;
        this.postLocalService.set(this.post);
      });
    } else {
      this.showMessage('Não foi possível obter sua localização');
    }
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({ message: message, duration: 3000 });
    toast.present;
  }

  async showCloseOptions() {
    const alert = await this.alertCtrl.create({
      header: 'Descartar Postagem?',
      message: 'Deseja descartar esta postagem?',
      buttons: [
        {
          text: 'Descartar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.postLocalService.delete();
            this.close();
          }
        }, {
          text: 'Manter',
          handler: () => {
            this.close();
          }
        }
      ]
    });

    await alert.present();
  }

  saveLocal() {
    this.postLocalService.set(this.post);
  }

  close() {
    this.navCtrl.navigateBack("/home-post");
  }

  showMap() {
    this.navCtrl.navigateForward("/map-post");
  }

  async submit() {
    
    const filePath = `post_${new Date().getTime()}.jpg`;
    this.task = this.storage.ref(filePath).putString(this.post.image, 'data_url');
    this.progress = this.task.percentageChanges();

    this.task.then((data) => {
      const ref = this.storage.ref(data.metadata.fullPath);
      ref.getDownloadURL().subscribe((imgUrl) => {
        this.post.image = imgUrl;
        this.postRemoteService.create(this.post).then(() => {
          this.postLocalService.delete();
        });
        this.navCtrl.navigateBack("/home-post");
      });
    });
  }
}
