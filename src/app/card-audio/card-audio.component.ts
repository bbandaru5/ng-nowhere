import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxMasonryComponent } from 'ngx-masonry';
import { Subscription } from 'rxjs';
import { AudioCardModalComponent } from '../audio-card-modal/audio-card-modal.component';
import { AUDIO_CONTEXT } from '../custom-wave/tokens/audio-context';
import { CommunicationService } from '../shared/communication.service';
import { ThemingService } from '../theming.service';

@Component({
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrls: ['./card-audio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardAudioComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy  {
    subscription: Subscription;
    @Input() card;
    @Output() showAudioCard = new EventEmitter();
    @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
    buffers = [Date.now()];
    source: AudioScheduledSourceNode;
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
    show = false;
    type: BiquadFilterType = 'lowpass';
    curve = makeDistortionCurve(this.distortion);
    started = true;
    readonly real = [0, 0, 1, 0, 1];
    isSafari = false;
    pulseWidth = 158;
    stopped= false;
    discImage;

    constructor(@Inject(AUDIO_CONTEXT) private readonly context: AudioContext, 
    private themingService: ThemingService,
    private cdRef:ChangeDetectorRef,
    private communicationService: CommunicationService,
    public dialog: MatDialog) {
        this.subscription = communicationService.getMessage().subscribe(message=>{
            if(this.source){
                if(message.play === true){
                    this.stopped = false;
                    this.source.start();        
                }else if(message.play === false){
                    // if(!this.stopped)
                        // this.source.stop(); 
                    this.show = false;
                    this.card.show = false;
                    this.buffers[0] = Date.now();  
                    this.stopped = true;
                    cdRef.detectChanges();
                }
            }
        });
     }

    ngOnInit(): void {
        if(this.getBrowserName() === 'safari'){
            this.isSafari = true;
        }
        this.show = this.card.show;
        if(window.innerWidth > 380){
            this.pulseWidth = 169
        }
        this.updateTheme();
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
        //this.source.stop();
        this.communicationService.sendMessage({showFloatAudioPlayer: false});
    }
    get distortionCompensation(): number {
        return 1.2 - this.distortion / 20;
    }


    onCurveChange(distortion: number) {
        this.distortion = distortion;
        this.curve = makeDistortionCurve(distortion);
    }
    onClickPlayButton(button: HTMLButtonElement){
        if (button.textContent!.trim() === 'not_started') {
            this.communicationService.sendMessage({showFloatAudioPlayer: true});
            this.communicationService.sendMessage({ loaded: false });
            this.stopped = false;
            button.textContent = "highlight_off";
        }else{
            button.textContent = "not_started";
            this.stopped = true;
            this.communicationService.sendMessage({showFloatAudioPlayer: false});
        }
    }
    onClick(source: AudioScheduledSourceNode, button: HTMLButtonElement) {
        if (button.textContent!.trim() === 'not_started') {
            this.stopped = false;
            button.textContent = 'highlight_off';
            source.start();
            this.source = source;
            this.communicationService.sendMessage({showFloatAudioPlayer: true});
            this.communicationService.sendMessage({ loaded: false });
        } else {
            source.stop();
            this.show = false;
            this.card.show = false;
            this.buffers[0] = Date.now();
            this.communicationService.sendMessage({showFloatAudioPlayer: false});
        }
    }
    ngAfterViewInit() {
        this.updateTheme();
        this.show = this.card.show;
        this.cdRef.detectChanges();  
        this.context.resume(); 
    }
    ngAfterViewChecked(): void{
        this.show = this.card.show;
        this.updateTheme();
        this.cdRef.detectChanges();
    }
    updateTheme(){
    if(this.themingService.theme.value === 'light-theme'){
        this.discImage = "assets/images/disc-light-mode.svg";
        this.cdRef.detectChanges();
    }else{
        this.discImage = "assets/images/disc-dark-mode.svg";
        this.cdRef.detectChanges();
    }
    }
    onTimeDomain(array: Uint8Array, canvas: HTMLCanvasElement) {
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) {
            return;
        }
        canvasCtx.clearRect(0,0,this.pulseWidth,120);
        canvasCtx.fillStyle = "rgba(0, 0, 200, 0)";
        canvasCtx.fillRect(0, 0, this.pulseWidth+1, 120);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(244, 112, 54)';
        canvasCtx.beginPath();
        const sliceWidth = (this.pulseWidth * 1.0) / array.length;
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
        canvasCtx.lineTo(this.pulseWidth, 120 / 2);
        canvasCtx.stroke();
    }
    showPlay(){
        this.show = true;
        this.card.show = true;
        this.stopped = true;
        this.showAudioCard.emit(this.card);
    }
    onClickAudioCard1(){
        this.show = false;
        this.card.show = false;
        this.openDailog();
      }
      openDailog(){
        return this.dialog.open(AudioCardModalComponent, {
            width: '380px',
            data: { "card": this.card}
          });
      }
    public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
            case agent.indexOf('edge') > -1:
            return 'edge';
            case agent.indexOf('opr') > -1 && !!(<any>window).opr:
            return 'opera';
            case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
            return 'chrome';
            case agent.indexOf('trident') > -1:
            return 'ie';
            case agent.indexOf('firefox') > -1:
            return 'firefox';
            case agent.indexOf('safari') > -1:
            return 'safari';
            default:
            return 'other';
        }
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