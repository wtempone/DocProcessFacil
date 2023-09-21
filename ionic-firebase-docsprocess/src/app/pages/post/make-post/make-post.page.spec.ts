import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakePostPage } from './make-post.page';

describe('MakePostPage', () => {
  let component: MakePostPage;
  let fixture: ComponentFixture<MakePostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
