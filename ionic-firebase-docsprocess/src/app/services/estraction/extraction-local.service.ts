import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExtractionLocalService {

  constructor() { }

  set(extraction: any) {
    localStorage.setItem(`${environment.localStorageKey}.extraction`, JSON.stringify(extraction));
  }

  get() {
    return localStorage.getItem(`${environment.localStorageKey}.extraction`);
  }
  delete() {
    localStorage.removeItem(`${environment.localStorageKey}.extraction`);
  }
}
