import { concatMap, delay, map, mergeMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { AlbumService } from '../services/album.service';
import { of } from 'rxjs';

export interface SongDetailInterface {
  userId: number;
  albumId: number;
  songId: number;
  songTitle: string;
  albumTitle: string;
  url: string;
  thumbnailUrl: string;
  playTime: number;
  singer: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  songsObj:any;
  albumObj: any;
  songsDetails: SongDetailInterface[];

  constructor(private albumService: AlbumService) { }


  ngOnInit(): void {
    this.albumService.getSongs().pipe(
      mergeMap(songsObj => this.getSongsDetail(songsObj))
    ).subscribe( response => {
      console.log(response);
    })

    // this.getAlbum();
    // this.getSongs();
    // this.songsDetails = this.getSongsDetail();
    // console.log(this.songsDetails);
  }

  public getAlbum(){
    this.albumService.getAlbum().subscribe((response)=>{
      this.albumObj = response;
    });
  }

  public getSongs(){
    this.albumService.getSongs().subscribe((response)=>{
      if(response){
        this.songsObj = response;
      }
    });
  }

  public getSongsDetail(songsObj){
    console.log(songsObj);
    this.songsDetails = [];
    let albumObj: any;
    let detailObj: SongDetailInterface;
    this.albumService.getAlbum().subscribe((res)=>{
      albumObj = res;
      songsObj.forEach(song => {
        detailObj = {
          userId: undefined,
          albumId: undefined,
          songId: undefined,
          songTitle: undefined,
          albumTitle: undefined,
          url: undefined,
          thumbnailUrl: undefined,
          playTime: undefined,
          singer: undefined,
        };
        if(song){
          detailObj.songId = song.id;
          detailObj.songTitle = song.title;
          detailObj.thumbnailUrl = song.thumbnailUrl;
          detailObj.url = song.url;
          detailObj.albumId = song.albumId;
          detailObj.singer = 'Singer Name';
          albumObj.forEach(album => {
            if( song.albumId === album.id){
              detailObj.albumTitle = album.title;
              detailObj.userId = album.userId;
            }
          });
          detailObj.playTime = parseInt((Math.random()*10).toFixed(2));
          this.songsDetails.push(detailObj);
        }

      });
      console.log(this.songsDetails);
      this.albumService.setSongDetails(this.songsDetails);


    });
    return of(`retrieved new data`);
  }


}
