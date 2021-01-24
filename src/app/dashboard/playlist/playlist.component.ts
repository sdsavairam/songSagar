import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayListService } from 'src/app/services/play-list.service';
import { AlbumService } from 'src/app/services/album.service';
import {MatDialog} from '@angular/material/dialog'
import { CreatePlaylistModelComponent, UserPlayList } from './create-playlist-model/create-playlist-model.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  readonly PLAYLIST_KEY = 'usersPlayList';
  playList: UserPlayList[];
  songsList: any;

  @ViewChild('createPlaylistModel', { static: true }) createPlaylistModel: any;

  constructor(private playlistService: PlayListService,
    private albumService: AlbumService,public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getSongs();
    this.getPlaylist();
    console.log('Current PlayList:', this.playList);
  }

  openDialog() {
    const modelData = {
      editMode: false,
      userPlayList : [],
      songsList : this.songsList
    };
    const dialogRef = this.dialog.open(CreatePlaylistModelComponent,{
      data: modelData,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog create result: ${result}`);
      this.addToPlaylist(result);
    });
  }

  editPlayList(list){
    const modelData = {
      editMode: true,
      userPlayList : list,
      songsList: this.songsList
    };
    const dialogRef = this.dialog.open(CreatePlaylistModelComponent,{
      data: modelData,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Edit result: ${result}`);
      this.updateToPlaylist(result);
    });
  }

  getPlaylist(){
    let list = this.playlistService.getLocal(this.PLAYLIST_KEY);
    this.playList = list ? list : [];
  }

  addToPlaylist(userPlayList: UserPlayList){
    if(userPlayList && userPlayList.songList){
      userPlayList.id = this.playList.length;
      this.playList.push(userPlayList);
      this.playlistService.setLocal(this.PLAYLIST_KEY, this.playList);
      this.getPlaylist();
    }
  }

  updateToPlaylist(userPlayList: UserPlayList){
    if(userPlayList){
      this.playList.forEach(list => {
        if(list.id === userPlayList.id){
          list = userPlayList;
        }
      });
      this.playlistService.setLocal(this.PLAYLIST_KEY, this.playList);
    }
  }

  deleteFromPlaylist(list){
    if(list){
      let index = this.playList.indexOf(list);
      this.playList.splice(index, 1);
      this.playlistService.setLocal(this.PLAYLIST_KEY, this.playList);
      this.getPlaylist();
    }
  }

  clearAllPlaylist(){
    this.playlistService.clearLocal(this.PLAYLIST_KEY);
    this.getPlaylist();
  }

  public getSongs(){
    this.albumService.getSongDetails().subscribe((response)=>{
      if(response){
        this.songsList = response;
      }
    });
  }

}
