import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeAppointmentPage } from './home-appointment.page';

describe('HomeAppointmentPage', () => {
  let component: HomeAppointmentPage;
  let fixture: ComponentFixture<HomeAppointmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
