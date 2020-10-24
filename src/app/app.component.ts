import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked{
  title = 'nowhere';
  themingSubscription: Subscription;
  @HostBinding('class') public cssClass: string;

  constructor(private overlayContainer: OverlayContainer,
     private themingService: ThemingService,
     private elementRef: ElementRef){

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
