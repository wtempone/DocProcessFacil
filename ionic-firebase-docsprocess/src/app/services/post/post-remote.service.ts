import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Post } from 'src/app/models/post.model';
@Injectable({
  providedIn: 'root'
})
export class PostRemoteService {

  ListRef: AngularFireList<any>;
  Ref: AngularFireObject<any>;
  DocName: string = 'post'

  constructor(
    private db: AngularFireDatabase,
  ) {}
  create(rec: Post) {
    if (!this.ListRef) this.ListRef = this.db.list(`/${this.DocName}`);
    return this.ListRef.push({
      description: rec.description,
      image: rec.image,
      location: rec.location,
    });
  }

  get(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    return this.Ref;
  }

  getList() {
    this.ListRef = this.db.list(`/${this.DocName}`);
    return this.ListRef;
  }

  update(id: any, rec: Post) {
    return this.Ref.update({
      description: rec.description,
      image: rec.image,
      location: rec.location,
    });
  }

  delete(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    this.Ref.remove();
  }

}
