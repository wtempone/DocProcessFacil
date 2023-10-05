import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-doc-review',
  templateUrl: './doc-review.component.html',
  styleUrls: ['./doc-review.component.scss'],
})
export class DocReviewComponent  implements OnInit {
  public tipifications: any

  constructor(
    private navParams: NavParams,

  ) { }

  ngOnInit() {
    this.tipifications = this.navParams.get('tipifications');
  }
  getTag(tags: string[], type: string) {
    return tags.filter(tag => tag.indexOf(type) !== -1)
      .map((x) => x.split('=')[1])[0]
  }

}
