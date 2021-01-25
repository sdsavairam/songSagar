import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  public albumList: any;
  public dataList: any;
  public filterList: any;
  public searchText: string;
  public errorMsg: string;
  public showError = false;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbum();
  }

  public getAlbum(){
    this.albumService.getAlbum().subscribe((response)=>{
      this.albumList = response;
      this.dataList = this.albumList;
    });
  }

  filterAlbums(){
    this.showError = false;
    if (this.searchText) {
      this.filterList = this.albumList.filter(album => album.title.includes(this.searchText));
      this.dataList = this.filterList;
      if (this.filterList.length <= 0) {
        this.showError = true;
        this.errorMsg = 'Album not found';
        this.dataList = this.filterList;
      }
    } else {
      this.dataList = this.albumList;
    }
  }

}
