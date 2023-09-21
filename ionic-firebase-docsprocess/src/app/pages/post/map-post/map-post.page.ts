import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostLocalService } from 'src/app/services/post/post-local.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-post',
  templateUrl: './map-post.page.html',
  styleUrls: ['./map-post.page.scss'],
})
export class MapPostPage implements AfterViewInit {


  public post: Post = new Post('', '', '');

  constructor(
    private postLocalService: PostLocalService,
  ) {
    const data = postLocalService.get();
    if (data) this.post = JSON.parse(data);
  }

  ngAfterViewInit() {
    // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
    var html = `<iframe style="height: 100vh;" width="100%" height="99%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?key=${environment.googleMapApiKey}&origin=` + this.post.location + '&destination=' + this.post.location + '" allowfullscreen></iframe>';
    console.log(html);
    var mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = html;
    } 
  }
}
