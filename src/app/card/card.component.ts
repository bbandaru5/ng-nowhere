import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommunicationService } from '../shared/communication.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {

  constructor(private messageService: CommunicationService,
    private cdRef:ChangeDetectorRef) { 
    this.subscription =  this.messageService.obscenetiy().subscribe(message => {
      console.log("ujjjn")
      this.obscenity = message;
      this.cdRef.detectChanges();
  });
  }
  @Input()
  type : string;
  @Input() card;
  card1;
  card2;
  readMore = true;
  obscenity = true;
  @Output() showAudioCard = new EventEmitter();
  @Output() reloadCards = new EventEmitter();
  subscription: Subscription;
  position = new FormControl("below");
  ngOnInit(): void {
    if(this.card.type ==="audio"){
      this.card1 = this.card.data[0];
      this.card2 = this.card.data[1];
    }
    if(this.card.type === "text" && this.card.desc.length < 600){
        this.readMore = false;
    }
  }
  updateCard(input){
      this.showAudioCard.emit(input)
  }
  onClickReadMore(){
    this.readMore = false;
    this.reloadCards.emit(this.readMore);
  }
}
