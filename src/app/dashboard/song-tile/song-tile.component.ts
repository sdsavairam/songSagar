import { Component, OnInit, Input } from '@angular/core';
import { SongDetailInterface } from '../dashboard.component';

@Component({
  selector: 'app-song-tile',
  templateUrl: './song-tile.component.html',
  styleUrls: ['./song-tile.component.scss']
})
export class SongTileComponent implements OnInit {

  @Input() song: SongDetailInterface;

  constructor() { }

  ngOnInit(): void {

  }

}
