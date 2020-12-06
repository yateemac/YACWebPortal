import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesServiceDepartmentComponent } from './sales-service-department.component';

describe('SalesServiceDepartmentComponent', () => {
  let component: SalesServiceDepartmentComponent;
  let fixture: ComponentFixture<SalesServiceDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesServiceDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesServiceDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
