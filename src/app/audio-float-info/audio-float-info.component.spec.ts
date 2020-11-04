import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFloatInfoComponent } from './audio-float-info.component';

describe('AudioFloatInfoComponent', () => {
  let component: AudioFloatInfoComponent;
  let fixture: ComponentFixture<AudioFloatInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioFloatInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioFloatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
