import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent implements OnInit {

  cards=[
    {type:"audio"},
    {type:"text"},
    {type:"audio"},
    {type:"text"},
    {type:"text"},
    {type:"text"},
    {type:"text"},
    {type:"audio"},
    {type:"text"},
    {type:"audio"},
    {type:"text"},
    {type:"text"},
    {type:"audio"},
    {type:"text"},
    {type:"audio"},
  ];
  public myOptions: NgxMasonryOptions = {
    gutter: 36,
    fitWidth:true,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
