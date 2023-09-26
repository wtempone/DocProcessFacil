import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTemplatePage } from './list-template.page';

describe('ListTemplatePage', () => {
  let component: ListTemplatePage;
  let fixture: ComponentFixture<ListTemplatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
