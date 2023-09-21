import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLocalService {

  constructor() {}

  set(user: User) {
    localStorage.setItem(`${environment.localStorageKey}.user`, JSON.stringify(user));
  }

  get() {
    return localStorage.getItem(`${environment.localStorageKey}.user`);
  }
  
  delete() {
    localStorage.removeItem(`${environment.localStorageKey}.user`);
  }
}
