import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongsComponent } from './dashboard/songs/songs.component';
import { PlaylistComponent } from './dashboard/playlist/playlist.component';
import { AlbumsComponent } from './dashboard/albums/albums.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'dashboard/songs', component: SongsComponent },
      { path: 'dashboard/playlist', component: PlaylistComponent },
      { path: 'dashboard/albums', component: AlbumsComponent },
      { path: '**', component: DashboardComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
