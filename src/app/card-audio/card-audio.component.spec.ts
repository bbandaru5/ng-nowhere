import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAudioComponent } from './card-audio.component';

describe('CardAudioComponent', () => {
  let component: CardAudioComponent;
  let fixture: ComponentFixture<CardAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
