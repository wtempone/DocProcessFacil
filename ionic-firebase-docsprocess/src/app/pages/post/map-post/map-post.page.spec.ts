import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapPostPage } from './map-post.page';

describe('MapPostPage', () => {
  let component: MapPostPage;
  let fixture: ComponentFixture<MapPostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
