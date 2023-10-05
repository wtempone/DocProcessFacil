import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { RequiredDocs, Template } from 'src/app/models/template.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequireDocsRemoteService {

  ListRef: AngularFireList<any>;
  Ref: AngularFireObject<any>;
  DocName: string = 'required-docs'

  constructor(
    private db: AngularFireDatabase,
  ) {}
  create(rec: RequiredDocs) {
    if (!this.ListRef) this.ListRef = this.db.list(`/${this.DocName}`);

    return this.ListRef.push({
      templateId: rec.templateId,
      name: rec.name,
      description: rec.description || null,
      type: rec.type  || null,
      subtype: rec.subtype  || null,
      tipification: rec.tipification  || null,
      urlFile: rec.urlFile  || null,
      extension: rec.extension  || null
    });
  }

  get(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    return this.Ref;
  }

  getByTemplateId(templateId: string) {
    return this.db.list(`/${this.DocName}`,
      docs => docs
        .orderByChild('templateId')
        .equalTo(templateId)
    );
  }

  update(id: any, rec: RequiredDocs) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);

    return this.Ref.update({
      templateId: rec.templateId,
      name: rec.name,
      description: rec.description  || null,
      type: rec.type  || null,
      subtype: rec.subtype  || null,
      tipification: rec.tipification  || null,
      urlFile: rec.urlFile  || null,
      extension: rec.extension  || null
    });
  }

  delete(id: string) {
    this.Ref = this.db.object(`/${this.DocName}/` + id);
    this.Ref.remove();
  }
}
