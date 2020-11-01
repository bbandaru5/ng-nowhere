import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AUDIO_CONTEXT } from '@ng-web-apis/audio';
import { NgxMasonryComponent } from 'ngx-masonry';
import { ThemingService } from '../theming.service';

@Component({
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrls: ['./card-audio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardAudioComponent implements OnInit, AfterViewChecked, AfterViewInit  {
  buffers = [Date.now()];

  selectedChain = 'dry';

  selectedSource = 'buffer';

  audioBackgroundColor = 'rgb(224, 217, 210)';

  gain = 1;

  pan = 0;

  delayTime = 1;

  delayGain = 0.5;

  distortion = 20;

  frequency = 350;

  detune = 0;

  filterGain = 0;

  Q = 1;

  show = false;

  type: BiquadFilterType = 'lowpass';

  curve = makeDistortionCurve(this.distortion);

  started = true;

  readonly real = [0, 0, 1, 0, 1];

  @ViewChild('chain',{static: false})
  readonly chain?: AudioNode;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(@Inject(AUDIO_CONTEXT) private readonly context: AudioContext, private themingService: ThemingService,private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateTheme();
    this.context.resume();
  }

  get distortionCompensation(): number {
    return 1.2 - this.distortion / 20;
}


onCurveChange(distortion: number) {
    this.distortion = distortion;
    this.curve = makeDistortionCurve(distortion);
}

onClick(source: AudioScheduledSourceNode, button: HTMLButtonElement) {
    if (button.textContent!.trim() === 'play_arrow') {
        button.textContent = 'highlight_off';
        source.start();
    } else {
        this.show = false;
        this.buffers[0] = Date.now();
    }
}
ngAfterViewInit() {
    this.updateTheme();
    this.cdRef.detectChanges();
}
  ngAfterViewChecked(): void{
    this.updateTheme();
    this.cdRef.detectChanges();
}
  updateTheme(){
    if(this.themingService.theme.value === 'light-theme'){
      this.audioBackgroundColor = 'rgb(224, 217, 210)';
     }else{
      this.audioBackgroundColor = 'rgb(38, 39, 43)';
     
     }
  }
onTimeDomain(array: Uint8Array, canvas: HTMLCanvasElement) {
    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) {
        return;
    }
    canvasCtx.clearRect(0,0,120,120);
    canvasCtx.fillStyle = "rgba(0, 0, 200, 0)";
    
    // canvasCtx.globalAlpha = 0.1;
    canvasCtx.fillRect(0, 0, 121, 120);
    // canvasCtx.globalAlpha = 1.0;
    // canvasCtx.fillRect(0, 0, 120, 120);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(244, 112, 54)';

    canvasCtx.beginPath();

    const sliceWidth = (120 * 1.0) / array.length;
    let x = 0;

    for (let i = 0; i < array.length; i++) {
        const v = array[i] / 128.0;
        const y = (v * 120) / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(120, 120 / 2);
    canvasCtx.stroke();
   
}
showPlay(){
 this.show = true     
}
}
function makeDistortionCurve(amount: number): Float32Array {
  const samples = 44100;
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;

  for (let i = 0; i < samples; ++i) {
      const x = (i * 2) / samples - 1;

      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}