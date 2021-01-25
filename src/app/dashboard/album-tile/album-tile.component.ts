import { Component, Input, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistModelComponent } from '../playlist/create-playlist-model/create-playlist-model.component';

@Component({
  selector: 'app-album-tile',
  templateUrl: './album-tile.component.html',
  styleUrls: ['./album-tile.component.scss']
})
export class AlbumTileComponent implements OnInit {

  public songsList: any;
  @Input() album: any;

  constructor(private albumService:AlbumService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  viewSong(selectedAlbum){

    this.albumService.getSongs(selectedAlbum.id).subscribe(
      (response)=>{
        this.songsList = response;
        this.openDialog();
      });
  }

  openDialog(){
    const modelData = {
      editMode: false,
      viewMode: true,
      userPlayList : [],
      songsList : this.songsList
    };
    const dialogRef = this.dialog.open(CreatePlaylistModelComponent,{
      data: modelData,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog create result: ${result}`);
    });
  }

}
