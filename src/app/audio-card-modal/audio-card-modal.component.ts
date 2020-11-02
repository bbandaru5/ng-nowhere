import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import WaveSurfer from 'wavesurfer.js';
@Component({
  selector: 'app-audio-card-modal',
  templateUrl: './audio-card-modal.component.html',
  styleUrls: ['./audio-card-modal.component.scss']
})
export class AudioCardModalComponent implements OnInit,AfterViewChecked {
  wave: WaveSurfer = null;
  loading = true;
  loaded = false;
  url = "assets/mp3/sample.mp3";
  musicButton = "not_started";
  duration = "1:00";
  constructor(private cdr: ChangeDetectorRef, public dialogRef: MatDialogRef<AudioCardModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  card: any;

  ngOnInit(): void {
    this.card = this.data.card;
    this.loading = false;
    this.dialogRef.updatePosition({top: '100px'})
    this.dialogRef.afterClosed().subscribe(result =>{
      if(this.wave)
       this.onStopPressed();
    });
  }

  ngAfterViewChecked(){
    if(this.wave){
      this.getDuration();
      this.cdr.detectChanges();
    }
}
generateWaveform(): void {
  this.loading = true;
  Promise.resolve(null).then(() => {
    this.wave = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#f47037',
      hideScrollbar: true,
      height:52,
      progressColor: 'gray',
    });
    this.wave.hideScrollbar = true;
    this.wave.on('ready', () => {
      this.loading = false;
      this.loaded = true;
      this.wave.play();
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
  if (!this.wave) {
    this.generateWaveform();
  }
  this.cdr.detectChanges();
  Promise.resolve().then(() => this.wave.load(this.url));
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
  this.dialogRef.close();
}
}
