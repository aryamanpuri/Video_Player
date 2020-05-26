import { Injectable } from '@angular/core';
import { VideoModel } from '../models/video.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikedVideosService {
  private ratedVideos: BehaviorSubject<VideoModel[]>;
  private _ratedVideosDefault: VideoModel[] = [];
  private ratedVideosObservable: Observable<VideoModel[]>;
   

  constructor() {
    this.ratedVideos = new BehaviorSubject<VideoModel[]>(this._ratedVideosDefault);

    this.ratedVideosObservable = new Observable<VideoModel[]>((o) => {
      this.ratedVideos.subscribe(res => {
        o.next(res);
        o.complete();
      })
    })
   }


   getRatedVideos(){
     return this.ratedVideosObservable;
   }

   AddRatedVideo(video: VideoModel){
     this._ratedVideosDefault.push(video);
     this.ratedVideos.next(this._ratedVideosDefault);
     return this.ratedVideosObservable;
   }

   ChangeRating(video: VideoModel){
      let idx = this._ratedVideosDefault.findIndex(i => i.videoId == video.videoId);
      this._ratedVideosDefault[idx] = video;
      this.ratedVideos.next(this._ratedVideosDefault);
      return this.ratedVideosObservable;
   }

}
