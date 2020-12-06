import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesDetailComponent } from './premises-detail.component';

describe('PremisesDetailComponent', () => {
  let component: PremisesDetailComponent;
  let fixture: ComponentFixture<PremisesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremisesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
