import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePostPage } from './home-post.page';

describe('HomePostPage', () => {
  let component: HomePostPage;
  let fixture: ComponentFixture<HomePostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
