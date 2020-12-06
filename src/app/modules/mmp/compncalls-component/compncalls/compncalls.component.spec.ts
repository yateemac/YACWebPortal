import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompncallsComponent } from './compncalls.component';

describe('CompncallsComponent', () => {
  let component: CompncallsComponent;
  let fixture: ComponentFixture<CompncallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompncallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompncallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
