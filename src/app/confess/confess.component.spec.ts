import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessComponent } from './confess.component';

describe('ConfessComponent', () => {
  let component: ConfessComponent;
  let fixture: ComponentFixture<ConfessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
