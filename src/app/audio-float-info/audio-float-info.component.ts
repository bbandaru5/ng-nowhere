import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'app-audio-float-info',
  templateUrl: './audio-float-info.component.html',
  styleUrls: ['./audio-float-info.component.scss']
})
export class AudioFloatInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loading = true;
  @Input() data;
  minimise = false;
  closed = false;
  chevron = "chevron_right"
  url = "assets/mp3/sample.mp3";
  musicButton = "not_started";
  duration = "1:00";
  expandMore = "expand_less"
  played = false;
  card: any;
  init = true;

  constructor(private cdr: ChangeDetectorRef, private messageService: CommunicationService) { 
     
    this.subscription =  this.messageService.getMessage().subscribe(message => {
      if(message.loaded == true){
        this.loading = false;
      }
      if (message.showFloatAudioPlayer === true) {
        this.played = true;
        this.initialisePlayer();
        console.log(message);
      } else if(message.showFloatAudioPlayer === false){
        this.onClickClosed();
        this.played =false;
      }
    });
  }

  ngOnInit(): void {
   
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  initialisePlayer(){
    this.loading = true;
    this.closed = false;
    this.chevron = "chevron_right"
    this.url = "assets/mp3/sample.mp3";
    this.musicButton = "stop_circle_filled";
    this.duration = "1:00";
    this.expandMore = "expand_more"
    this.card = this.data.card;
    this.loading = false;
    this.cdr.detectChanges();
    setTimeout(()=>{
      this.onClickClosed();
      this.cdr.detectChanges();
      clearInterval();
    },3000);
  }
  onPlayStopPressed(button: HTMLButtonElement){
    if (button.textContent!.trim() === 'not_started' && !this.loading) {
      this.musicButton = "pause_circle_filled";
      button.textContent = 'pause_circle_filled';
      this.onPlayPressed();
    }else if(button.textContent!.trim() === 'play_circle_filled'){
      this.messageService.sendMessage({play : true});
      button.textContent = 'stop_circle_filled';
    }else{
      this.played = false;
      button.textContent = 'play_circle_filled'
      this.messageService.sendMessage({play : false});
      this.onPausePressed();
    }
  }

  onPlayPressed(){
    
  }
  onStopPressed(): void {
    
  }
  onPausePressed(){
  }
  getDuration(){
  }

onClickMinimise(){
  this.minimise = !this.minimise;
  this.expandMore = this.minimise? "expand_less":"expand_more";
  this.cdr.detectChanges();
}
onClickClosed(){
  this.expandMore = this.minimise? "expand_less":"expand_more";
  this.closed = !this.closed;
  this.chevron = this.closed? "chevron_left": "chevron_right";
  this.cdr.detectChanges();
}
}
