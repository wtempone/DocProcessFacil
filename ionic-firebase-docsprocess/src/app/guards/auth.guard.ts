import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserLocalService } from '../services/user/user-local.service';

@Injectable()
export class AuthGuard {
    constructor(
        private navCtrl: NavController,
        private userLocalService: UserLocalService

    ) {

    }

    canActivate() {
        const user = this.userLocalService.get();
        if (!user) {
            this.navCtrl.navigateRoot('login');
            return false;
        }
        return true;
    }
}