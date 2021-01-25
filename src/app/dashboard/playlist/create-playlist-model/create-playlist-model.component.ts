import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UserPlayList {
  id: number;
  name: string;
  creationDate: Date;
  songList: any;
}

@Component({
  selector: 'app-create-playlist-model',
  templateUrl: './create-playlist-model.component.html',
  styleUrls: ['./create-playlist-model.component.scss']
})
export class CreatePlaylistModelComponent implements OnInit {
  songsList: any;
  playListName: string;
  errorMsg: string;
  showError = false;
  currentPlayList: UserPlayList;
  isEditPlayList= false;
  isAddPlayList= false;
  dataList: any;
  searchText: string;
  filterList: any;
  isViewMode= false;

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreatePlaylistModelComponent>) {
    this.updateData(data);
  }

  ngOnInit(): void {

  }

  updateData(data) {
    if (data) {
      if(data.viewMode){
        this.isEditPlayList = false;
        this.isAddPlayList= false;
        this.isViewMode = true;
        this.songsList = data.songsList;
        this.dataList = this.songsList;
      }else if (data.editMode) {
        this.isEditPlayList = true;
        this.isAddPlayList= false;
        this.playListName = data.userPlayList.name;
        this.currentPlayList = data.userPlayList;
        this.songsList = data.songsList
        this.dataList = this.currentPlayList.songList;
      } else {
        this.isEditPlayList = false;
        this.isAddPlayList= true;
        this.songsList = data.songsList;
        this.dataList = this.songsList;
        this.currentPlayList = {
          id: 0,
          name: undefined,
          creationDate: new Date(),
          songList: []
        }
      }
    }
  }

  createPlayList() {
    this.showError = false;
    if (this.playListName && this.currentPlayList.songList.length > 0) {
      this.currentPlayList.name = this.playListName;
      this.currentPlayList.creationDate = new Date();
      this.dialogRef.close(this.currentPlayList);
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
      this.errorMsg = 'Please add playlist name!'
    }
  }

  addToPlayList(song){
    this.currentPlayList.songList.push(song);
  }

  deleteFromPlayList(song){
    if(this.currentPlayList && this.currentPlayList.songList){
      let index = this.currentPlayList.songList.indexOf(song);
      this.currentPlayList.songList.splice(index, 1);
    }
  }

  shuffleSongs(){
    const list = this.dataList;
    let currentIndex = list.length;
    let temporaryValue: any;
    let randomIndex: any;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = list[currentIndex];
      list[currentIndex] = list[randomIndex];
      list[randomIndex] = temporaryValue;
    }
    this.dataList = list;
    this.currentPlayList.songList = this.dataList;
  }

  addSongs(){
    this.isAddPlayList= true;
    this.dataList = this.songsList;
    // this.songsList.forEach(song => {
    //   this.currentPlayList.songList.forEach(exSong => {
    //     if(exSong.songId === song.songId){
    //       song.exist = true;
    //     }
    //   });
    // });
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
