import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public songsObj: any;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getSongsDetails();
  }

  public getSongsDetails(){
    this.albumService.getSongDetails().subscribe((response)=>{
      console.log(response);
      if(response){
        this.songsObj = response;
      }
    });

  }

}
