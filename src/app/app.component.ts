import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked{
  title = 'nowhere';
  themingSubscription: Subscription;
  @HostBinding('class') public cssClass: string;
  data = {card : {unique_id:"1",show:false,type:"audio",userId: "@sadmonkey5045646546544",title:"I am a drug addict, this is my story and don't judge me for my actions.",
  desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore etc.Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquipex ea commodo consequat."}};
  constructor(private overlayContainer: OverlayContainer,
     private themingService: ThemingService,
     private elementRef: ElementRef,
     ){
  }

  ngAfterViewChecked(): void{
    if(this.themingService.theme.value !== 'light-theme'){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#0B0B0B";
     }else{
       this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#D6CCC1";
     }
  }
  ngOnDestroy() {
  this.themingSubscription.unsubscribe();
  }
  ngOnInit() {
  this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
    this.cssClass = theme;
    this.themingService.applyThemeOnOverlays(this.overlayContainer, this.themingService,this.cssClass);
  });
}
}
