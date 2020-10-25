import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from './material.module';
import { ConfessComponent } from './confess/confess.component';
import { HearComponent } from './hear/hear.component';
import { CardComponent } from './card/card.component';
import { CardsGridComponent } from './cards-grid/cards-grid.component'
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ThemingService} from './theming.service';
import {WebAudioModule} from '@ng-web-apis/audio';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ConfessComponent,
    HearComponent,
    CardComponent,
    CardsGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebAudioModule,
    MaterialModule,
    NgxMasonryModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'nowhere'}),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
    },
    ThemingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
