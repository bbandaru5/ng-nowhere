import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }
  @Input()
  type : string;
  @Input() card;
  card1;
  card2;
  readMore = true;
  @Output() showAudioCard = new EventEmitter();
  @Output() reloadCards = new EventEmitter();

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
