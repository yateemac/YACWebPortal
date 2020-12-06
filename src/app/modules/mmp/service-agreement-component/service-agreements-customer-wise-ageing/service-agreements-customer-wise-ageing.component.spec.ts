import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAgreementsCustomerWiseAgeingComponent } from './service-agreements-customer-wise-ageing.component';

describe('ServiceAgreementsCustomerWiseAgeingComponent', () => {
  let component: ServiceAgreementsCustomerWiseAgeingComponent;
  let fixture: ComponentFixture<ServiceAgreementsCustomerWiseAgeingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAgreementsCustomerWiseAgeingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAgreementsCustomerWiseAgeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
