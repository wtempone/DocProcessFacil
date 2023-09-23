import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRemoteService {


  ListRef: AngularFireList<any>;
  Ref: AngularFireObject<any>;
  DocName: string = 'user'

  constructor(
    private db: AngularFireDatabase,
  ) { }
  create(rec: User) {
    if (!this.ListRef) this.ListRef = this.db.list(`/${this.DocName}`);
    return this.ListRef.push({
      name: rec.name,
      image: rec.image,
      email: rec.email,
    });
  }

  get(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    return this.Ref;
  }
  getByEmail(email: string) {
    var query = this.db.list(`/${this.DocName}`,
      users => users
        .orderByChild('email')
        .equalTo(email).limitToFirst(1)
    );
    return query.valueChanges();
  }
  
  getList() {
    this.ListRef = this.db.list(`/${this.DocName}`);
    return this.ListRef;
  }

  update(id: any, rec: User) {
    return this.Ref.update({
      name: rec.name,
      image: rec.image,
      email: rec.email,
    });
  }

  delete(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    this.Ref.remove();
  }
}
