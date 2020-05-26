import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LikedVideosService } from '../services/liked-videos.service';
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

  constructor(private likedVideoService: LikedVideosService) { }

  ngOnInit() {
  }

 

  RateVideo(rate: string){
    let ratedVideo: VideoModel = {
      videoId: this.videoObj.videoId,
      title: this.videoObj.title,
      thumbnail: this.videoObj.thumbnail,
      isLiked: rate
    }
    
        if(this.ratedVideos.find(i => i.videoId == this.videoObj.videoId)){
          this.ratedVideosSubscription = this.likedVideoService.ChangeRating(ratedVideo).subscribe(res => {
            this.likeUpdate.emit(ratedVideo)
          })
        }
        else{
          this.ratedVideosSubscription = this.likedVideoService.AddRatedVideo(ratedVideo).subscribe(res =>{
            this.likeUpdate.emit(ratedVideo);
          })
        }
  }

}
