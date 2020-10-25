import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AUDIO_CONTEXT } from '@ng-web-apis/audio';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsGridComponent implements OnInit {
  buffers = [Date.now()];

  selectedChain = 'dry';

  selectedSource = 'buffer';

  gain = 1;

  pan = 0;

  delayTime = 1;

  delayGain = 0.5;

  distortion = 20;

  frequency = 350;

  detune = 0;

  filterGain = 0;

  Q = 1;

  type: BiquadFilterType = 'lowpass';

  curve = makeDistortionCurve(this.distortion);

  started = true;

  readonly real = [0, 0, 1, 0, 1];

  @ViewChild('chain',{static: false})
  readonly chain?: AudioNode;

  cards=[
    {type:"audio",userId: "@sadmonkey5045646546544"},
    {type:"text",userId: "@dirtycandy9"},
    {type:"audio",userId: "@sadpop607"},
    {type:"text",userId: "@freak102"},
    {type:"text",userId: "@crackhead603"},
    {type:"text",userId: "@deepshit504"},
    {type:"text",userId: "@dirtycandy207"},
    {type:"audio",userId: "@dirtycandy27"},
    {type:"text",userId: "@victim108"},
    {type:"audio",userId: "@freak207"},
    {type:"text",userId: "@sadpop603"},
    {type:"text",userId: "@sadmonkey507"},
    {type:"audio",userId: "@dirtycandy007"},
    {type:"text",userId: "@sadmonkey54"},
    {type:"audio",userId: "crack101"},
  ];
  public myOptions: NgxMasonryOptions = {
    gutter: 36,
    fitWidth:true,
  };
  constructor(@Inject(AUDIO_CONTEXT) private readonly context: AudioContext) { }

  ngOnInit(): void {
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
    if (button.textContent!.trim() === 'Play') {
        button.textContent = 'Stop';
        source.start();
    } else {
        this.buffers[0] = Date.now();
    }
}

onTimeDomain(array: Uint8Array, canvas: HTMLCanvasElement) {
    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) {
        return;
    }

    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(244, 112, 54)';

    canvasCtx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / array.length;
    let x = 0;

    for (let i = 0; i < array.length; i++) {
        const v = array[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
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