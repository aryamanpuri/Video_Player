import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoModel } from '../models/video.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @Input() videos: VideoModel[];
  @Output() videoSelected: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
   
  }

  SelectVideo(videoId: string){
    this.videoSelected.emit(videoId);
  }

}
