import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SongDetailInterface } from '../dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url: string;
  private songDetails: BehaviorSubject<any>;

  constructor(private http: HttpClient) { }


  setSongDetails(songDetail) {
    if (this.songDetails) {
      this.songDetails.next(songDetail);
    } else {
      this.songDetails = new BehaviorSubject<any>(null);
    }
  }

  getSongDetails() {
    if (this.songDetails) {
      return this.songDetails;
    } else {
      this.songDetails = new BehaviorSubject<any>(null);
      return this.songDetails;
    }
  }

  public getAlbum(){
    this.url = 'https://jsonplaceholder.typicode.com/albums';
    // requestOptions = true;
    return this.http.get(this.url);
  }

  public getSongs(){
    this.url = 'https://jsonplaceholder.typicode.com/photos';
    // requestOptions = true;
    return this.http.get(this.url);
  }
}
