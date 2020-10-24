import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearComponent } from './hear.component';

describe('HearComponent', () => {
  let component: HearComponent;
  let fixture: ComponentFixture<HearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
