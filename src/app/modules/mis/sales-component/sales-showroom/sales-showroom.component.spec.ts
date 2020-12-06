import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesShowroomComponent } from './sales-showroom.component';

describe('SalesShowroomComponent', () => {
  let component: SalesShowroomComponent;
  let fixture: ComponentFixture<SalesShowroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesShowroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesShowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
