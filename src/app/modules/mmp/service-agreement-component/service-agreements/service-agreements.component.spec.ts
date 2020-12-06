import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAgreementsComponent } from './service-agreements.component';

describe('ServiceAgreementsComponent', () => {
  let component: ServiceAgreementsComponent;
  let fixture: ComponentFixture<ServiceAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
