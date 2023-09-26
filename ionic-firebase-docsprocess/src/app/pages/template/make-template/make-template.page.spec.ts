import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeTemplatePage } from './make-template.page';

describe('MakeTemplatePage', () => {
  let component: MakeTemplatePage;
  let fixture: ComponentFixture<MakeTemplatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakeTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
