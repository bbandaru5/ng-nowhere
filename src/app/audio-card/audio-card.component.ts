import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import WaveSurfer from 'wavesurfer.js';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'app-audio-card',
  templateUrl: './audio-card.component.html',
  styleUrls: ['./audio-card.component.scss'],
})
export class AudioCardComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  wave: WaveSurfer = null;
  loading = true;
  @Input() data;
  minimise = true;
  closed = false;
  chevron = "chevron_left"
  url = "assets/mp3/sample.mp3";
  musicButton = "not_started";
  duration = "1:00";
  expandMore = "expand_less"
  constructor(private cdr: ChangeDetectorRef, private messageService: CommunicationService) { 
    this.subscription =  this.messageService.getMessage().subscribe(message => {
      if (message.showFloatAudioPlayer) {
        this.played = true;
        console.log(message);
        this.initialisePlayer();
      } else {
        if(this.wave){
          this.wave.stop();
          this.wave.destroy();
        }
        this.onClickClosed();
        this.played =false;
      }
    });
  }
  played = false;
  card: any;
  init = true;
  ngOnInit(): void {this.minimise = true;
   
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  initialisePlayer(){
    this.wave = null;
    this.minimise = true;
    this.loading = true;
    this.closed = false;
    this.chevron = "chevron_left"
    this.url = "assets/mp3/sample.mp3";
    this.musicButton = "not_started";
    this.duration = "1:00";
    this.expandMore = "expand_less"
    this.card = this.data.card;
    this.loading = false;
    if (!this.wave) {
      this.generateWaveform();
    }
    this.cdr.detectChanges();
    Promise.resolve().then(() => this.wave.load(this.url));
  }

generateWaveform(): void {
  this.loading = true;
  Promise.resolve(null).then(() => {
    this.wave = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#f47037',
      hideScrollbar: true,
      height:36,
      responsive:true,
      progressColor: 'gray',
    });
    this.wave.hideScrollbar = true;
    this.wave.on('ready', () => {
      this.loading = false;
      this.getDuration();
      this.cdr.detectChanges();
    });
  });
}
onPlayStopPressed(button: HTMLButtonElement){
  if (button.textContent!.trim() === 'not_started' && !this.loading) {
    this.musicButton = "pause_circle_filled";
    button.textContent = 'pause_circle_filled';
    this.onPlayPressed();
  }else if(button.textContent!.trim() === 'play_circle_filled'){
    button.textContent = 'pause_circle_filled';
    this.wave.playPause();
  }else{
    button.textContent = 'play_circle_filled'
    this.onPausePressed();
  }

}
onPlayPressed(){
  this.wave.play();
}
onStopPressed(): void {
  this.wave.stop();
}
onPausePressed(){
  this.wave.pause();
}
getDuration(){
  let secs = this.wave.getDuration();
  this.duration = Math.floor(secs/60) + " : " + ("0" + Math.floor(secs - 60*Math.floor(secs/60))).slice(-2);
}
onClickDismiss(){
}
onClickMinimise(){
  this.minimise = !this.minimise;
  this.expandMore = this.minimise? "expand_less":"expand_more";
}
onClickClosed(){
  this.minimise = true;
  this.expandMore = this.minimise? "expand_less":"expand_more";
  this.closed = !this.closed;
  this.chevron = this.closed? "chevron_right": "chevron_left";
}
}
