import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAgreementsChildComponent } from './service-agreements-child.component';

describe('ServiceAgreementsChildComponent', () => {
  let component: ServiceAgreementsChildComponent;
  let fixture: ComponentFixture<ServiceAgreementsChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAgreementsChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAgreementsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
