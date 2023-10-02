import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Post } from 'src/app/models/post.model';
import { Template } from 'src/app/models/template.model';
import { UserLocalService } from '../user/user-local.service';
@Injectable({
  providedIn: 'root'
})
export class TemplateRemoteService {

  ListRef: AngularFireList<any>;
  Ref: AngularFireObject<any>;
  DocName: string = 'template'

  constructor(
    private db: AngularFireDatabase,
    private userLocalService: UserLocalService
  ) {}
  create(rec: Template) {
    if (!this.ListRef) this.ListRef = this.db.list(`/${this.DocName}`);
    this.userLocalService.get;
    const user =  JSON.parse(this.userLocalService.get()!);
    return this.ListRef.push({
      name: rec.name,
      description: rec.description,
      body: rec.body,
      userId: user.$key,
    });
  }

  get(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    return this.Ref;
  }
  getByUser(userId: string) {
    return this.db.list(`/${this.DocName}`,
      users => users
        .orderByChild('userId')
        .equalTo(userId)
    );
  }
  getList() {
    this.ListRef = this.db.list(`/${this.DocName}`);
    return this.ListRef;
  }

  update(id: any, rec: Template) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    this.userLocalService.get;
    const user =  JSON.parse(this.userLocalService.get()!);
    return this.Ref.update({
      name: rec.name,
      description: rec.description,
      body: rec.body,
      userId: user.$key,
    });
  }

  delete(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    this.Ref.remove();
  }
}
