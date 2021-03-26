import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CustWebAudioModule} from '../../module';
import {WebAudioContext} from '../audio-context';

describe('AudioContext', () => {
    @Component({
        template: `
            <div waAudioContext sampleRate="22050"></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioContext)
        audioContext!: AudioContext;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CustWebAudioModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates context', () => {
        expect(testComponent.audioContext instanceof AudioContext).toBe(true);
    });
});
