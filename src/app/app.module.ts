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
import { ThemingService } from './theming.service';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CardAudioComponent } from './card-audio/card-audio.component';
import { CardSmallWaveComponent } from './card-small-wave/card-small-wave.component';
import { AudioCardModalComponent } from './audio-card-modal/audio-card-modal.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AudioCardComponent } from './audio-card/audio-card.component';
import { CommunicationService } from './shared/communication.service';
import { AudioFloatInfoComponent } from './audio-float-info/audio-float-info.component';
import { CustWebAudioModule } from './custom-wave/module'
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ConfessComponent,
    HearComponent,
    CardComponent,
    CardsGridComponent,
    CardAudioComponent,
    CardSmallWaveComponent,
    AudioCardModalComponent,
    AudioCardComponent,
    AudioFloatInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgxMasonryModule,
    CustWebAudioModule,
    FormsModule,
    PipesModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'nowhere'}),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
    },{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    ThemingService,
    CommunicationService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
