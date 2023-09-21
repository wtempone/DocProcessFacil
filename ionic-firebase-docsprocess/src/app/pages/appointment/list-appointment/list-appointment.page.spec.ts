import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAppointmentPage } from './list-appointment.page';

describe('ListAppointmentPage', () => {
  let component: ListAppointmentPage;
  let fixture: ComponentFixture<ListAppointmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAppointmentPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
