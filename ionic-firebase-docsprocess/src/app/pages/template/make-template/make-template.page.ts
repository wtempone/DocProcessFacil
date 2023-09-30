import { Component, OnInit } from '@angular/core';
import DecoupledEditor from '../../../../../src/plugins/ckeditor5-custom-build';
import { MenuController } from '@ionic/angular';
import { tipificacoes } from './mock-template';
import { of } from 'rxjs';
import { delay, filter, map, first } from 'rxjs/operators';
@Component({
  selector: 'app-make-template',
  templateUrl: './make-template.page.html',
  styleUrls: ['./make-template.page.scss'],
})
export class MakeTemplatePage implements OnInit {
  public editor: DecoupledEditor
  model: {
    html: string
  }
  public tipifications: any

  constructor(
    private menuCtrl: MenuController,

  ) { }

  ngOnInit() {

    DecoupledEditor
      .create(document.querySelector('.document-editor__editable') as HTMLElement)
      .then((editor) => {
        const toolbarContainer = document.querySelector('.document-editor__toolbar') as HTMLElement;

        toolbarContainer.appendChild(editor.ui.view.toolbar.element!);

        this.editor = editor;
      })
      .catch((err: any) => {
        console.error(err);
      });
    this.transformTipification();
  }

  transformTipification() {
    of(tipificacoes)
      .subscribe((val) => {
        this.tipifications = val.tipificacoes;
      });
    console.log('tipificacoes', this.tipifications)

  }

  getTag(tags: string[], type: string) {
    return tags.filter(tag => tag.indexOf(type) !== -1)
      .map((x) => x.split('=')[1])[0]
  }

  insertField(field: any) {

    this.editor.editing.view.focus();

    if (field) {
      this.editor.execute('external',
        {
          "path": 'documento[1].pagina[2].fiield[1]',
          "documentId": "hsFliiE6o0aID6lYqgGtb",
          "page": {
            "index": 0,
            "type": "personal-document",
            "subtype": "rg",
          },
          "field": {
            "name": field.name,
            "stdName": field.name,
            "value": field.value,
            "score": 1
          },
        }
      );
    }

  }

  openInfoMenu() {
    this.menuCtrl.enable(true, 'info-menu');
    this.menuCtrl.open('info-menu');
  }

}
