import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOneStopShopComponent } from './sales-one-stop-shop.component';

describe('SalesOneStopShopComponent', () => {
  let component: SalesOneStopShopComponent;
  let fixture: ComponentFixture<SalesOneStopShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOneStopShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOneStopShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
