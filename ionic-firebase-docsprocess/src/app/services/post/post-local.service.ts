import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostLocalService {

  constructor() {}

  set(post:Post) {
    localStorage.setItem(`${environment.localStorageKey}.post`, JSON.stringify(post));
  }

  get() {
    return localStorage.getItem(`${environment.localStorageKey}.post`);
  }
  delete() {
    localStorage.removeItem(`${environment.localStorageKey}.post`);
  }

}
