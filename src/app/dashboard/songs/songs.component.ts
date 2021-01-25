import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public songsList: any;
  searchText: string;
  filterList: any;
  dataList: any;
  showError = false;
  errorMsg: string;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getSongsDetails();
  }

  public getSongsDetails() {
    this.albumService.getSongDetails().subscribe((response) => {
      if (response) {
        this.songsList = response;
        this.dataList = this.songsList;
      }
    });
  }

  public filterSongs() {
    this.showError = false;
    if (this.searchText) {
      this.filterList = this.songsList.filter(song => song.songTitle.includes(this.searchText));
      this.dataList = this.filterList;
      if (this.filterList.length <= 0) {
        this.showError = true;
        this.errorMsg = 'Song not found';
        this.dataList = this.filterList;
      }
    } else {
      this.dataList = this.songsList;
    }

  }

}
