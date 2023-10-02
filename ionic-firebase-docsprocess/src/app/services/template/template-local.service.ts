import { Injectable } from '@angular/core';
import { Template } from 'src/app/models/template.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateLocalService {

  constructor() {}

  set(template: Template) {
    localStorage.setItem(`${environment.localStorageKey}.template`, JSON.stringify(template));
  }

  get() {
    return localStorage.getItem(`${environment.localStorageKey}.template`);
  }
  
  delete() {
    localStorage.removeItem(`${environment.localStorageKey}.template`);
  }}
