import { concatMap, delay, map, mergeMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { AlbumService } from '../services/album.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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

  songsList:any;
  albumObj: any;
  songsDetails: SongDetailInterface[];

  constructor(private albumService: AlbumService, private route: Router) { }


  ngOnInit(): void {
    this.route.navigate(['/dashboard/songs']);
    this.albumService.getSongs().pipe(
      mergeMap(songsList => this.getSongsDetail(songsList))
    ).subscribe( response => {
      console.log(response);
    })
  }

  public getAlbum(){
    this.albumService.getAlbum().subscribe((response)=>{
      this.albumObj = response;
    });
  }

  public getSongs(){
    this.albumService.getSongs().subscribe((response)=>{
      if(response){
        this.songsList = response;
      }
    });
  }

  public getSongsDetail(songsList){
    this.songsDetails = [];
    let albumObj: any;
    let detailObj: SongDetailInterface;
    this.albumService.getAlbum().subscribe((res)=>{
      albumObj = res;
      songsList.forEach(song => {
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
          let number = Math.random()*10;
          detailObj.playTime = Number(number.toFixed(2));
          this.songsDetails.push(detailObj);
        }

      });
      this.songsDetails.sort((a, b) => (a.playTime > b.playTime) ? 1 : -1);
      this.albumService.setSongDetails(this.songsDetails);


    });
    return of(`retrieved new data`);
  }


}
