import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacksAndShelvesComponent } from './racks-and-shelves.component';

describe('RacksAndShelvesComponent', () => {
  let component: RacksAndShelvesComponent;
  let fixture: ComponentFixture<RacksAndShelvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacksAndShelvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacksAndShelvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
