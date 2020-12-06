import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesContractsComponent } from './sales-contracts.component';

describe('SalesContractsComponent', () => {
  let component: SalesContractsComponent;
  let fixture: ComponentFixture<SalesContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
