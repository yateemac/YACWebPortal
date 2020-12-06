import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAgreementsWorkorderDetailsComponent } from './service-agreements-workorder-details.component';

describe('ServiceAgreementsWorkorderDetailsComponent', () => {
  let component: ServiceAgreementsWorkorderDetailsComponent;
  let fixture: ComponentFixture<ServiceAgreementsWorkorderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAgreementsWorkorderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAgreementsWorkorderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
