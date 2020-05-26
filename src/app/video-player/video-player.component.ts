import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VideoModel } from '../models/video.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPLayerComponent implements OnInit {
  @Input() videoUrl: string;
  @Input() videoObj: VideoModel;
  @Input() ratedVideos: VideoModel[];

  @Output() likeUpdate: EventEmitter<VideoModel> = new EventEmitter<VideoModel>();

  ratedVideosSubscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

 
}
