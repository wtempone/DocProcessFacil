import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTemplatePage } from './home-template.page';

describe('HomeTemplatePage', () => {
  let component: HomeTemplatePage;
  let fixture: ComponentFixture<HomeTemplatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
