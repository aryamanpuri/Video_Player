import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SafePipe } from './safe.pipe';
import { VideoPLayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlaylistComponent,
    SafePipe,
    VideoPLayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
