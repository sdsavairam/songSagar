import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumTileComponent } from './dashboard/album-tile/album-tile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
    CreatePlaylistModelComponent
} from './dashboard/playlist/create-playlist-model/create-playlist-model.component';
import { PlaylistComponent } from './dashboard/playlist/playlist.component';
import { SongTileComponent } from './dashboard/song-tile/song-tile.component';
import { SongsComponent } from './dashboard/songs/songs.component';
import { HeaderComponent } from './header/header.component';
import { AlbumService } from './services/album.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    AlbumTileComponent,
    SongTileComponent,
    SongsComponent,
    PlaylistComponent,
    CreatePlaylistModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule

  ],
  providers: [AlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
