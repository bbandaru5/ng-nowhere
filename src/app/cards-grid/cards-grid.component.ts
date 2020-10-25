import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
