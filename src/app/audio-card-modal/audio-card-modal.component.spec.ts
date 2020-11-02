import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCardModalComponent } from './audio-card-modal.component';

describe('AudioCardModalComponent', () => {
  let component: AudioCardModalComponent;
  let fixture: ComponentFixture<AudioCardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioCardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
