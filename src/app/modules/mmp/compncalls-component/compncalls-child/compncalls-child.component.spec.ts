import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompncallsChildComponent } from './compncalls-child.component';

describe('CompncallsChildComponent', () => {
  let component: CompncallsChildComponent;
  let fixture: ComponentFixture<CompncallsChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompncallsChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompncallsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
