import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievablesComponent } from './recievables.component';

describe('RecievablesComponent', () => {
  let component: RecievablesComponent;
  let fixture: ComponentFixture<RecievablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
