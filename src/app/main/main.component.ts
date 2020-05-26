import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube/youtube.service';
import { VideoModel } from '../models/video.model';
import { LikedVideosService } from '../services/liked-videos.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HistoryService } from '../services/history/history.service';
import { BookmarkService } from '../services/bookmark/bookmark.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  timer;
  start: number = 1800;

  searchValue: string;

  videosResponse: any = [];
  videos: VideoModel[] = [];

  currentVideo: VideoModel;
  videoUrl: string;

  ratedVideosSubscription: Subscription;
  ratedVideos: VideoModel[];

  videosFromHistory$: Observable<VideoModel[]>;
  videosFromBookmarks$: Observable<VideoModel[]>;
  videosFromBookmarksLength$: Observable<number>;
  isBookmarksView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private youtubeService: YoutubeService,
    private likedVideosService: LikedVideosService,
    private historyService: HistoryService,
    private bookmarkService: BookmarkService,
  ) {
    this.videosFromHistory$ = this.historyService.selectVideos();
    this.videosFromBookmarks$ = this.bookmarkService.selectVideos();
    this.videosFromBookmarksLength$ = this.videosFromBookmarks$.pipe(
      map(videos => videos.length),
    );
  }

  ngOnInit() {
  }

  StartTyping(){
    clearTimeout(this.timer)
  }

  FinishTyping(e){
    if(e.target.value){
    clearTimeout(this.timer);
    this.timer = setTimeout( () => {
      this.searchValue = e.target.value;
      this.GetResults();
    }, this.start)
  }
  else{
    this.searchValue = "";
    this.videoUrl = "";
    this.videos = [];
  }
  }

  GetResults(){
    this.videos = [];

    this.youtubeService.getVideos(this.searchValue).subscribe(res => {
      if(res.items.length > 0){
        this.videosResponse = res.items;
        this.GetLikes();
        this.OrderVideosList();
      }
    })
  }

  GetLikes(){
    this.ratedVideosSubscription = this.likedVideosService.getRatedVideos().subscribe(res => {
      this.ratedVideos = res;
  })
}

OrderVideosList(){
  let likedVideos = [];
  let disLikedVideos = [];
  let notRated = [];

  this.videosResponse.map(v => {
    if(this.ratedVideos.find(i => i.videoId == v.id.videoId)){
      if(this.ratedVideos.find(i => i.videoId == v.id.videoId).isLiked == "liked"){
        likedVideos.push(this.ratedVideos.find(i => i.videoId == v.id.videoId))
      }
      else if(this.ratedVideos.find(i => i.videoId == v.id.videoId).isLiked == "disliked"){
        disLikedVideos.push(this.ratedVideos.find(i => i.videoId == v.id.videoId));
      }
    }
    else{
      notRated.push({videoId: v.id.videoId, title: v.snippet.title, thumbnail: v.snippet.thumbnails.default.url, isLiked: ""});
    }
  })
  this.videos = likedVideos.concat(notRated, disLikedVideos)
}

  PlayVideo(video: VideoModel){
    this.currentVideo = video;
    this.videoUrl =  "https://www.youtube.com/embed/" + video.videoId;
    this.historyService.addVideo(video);
  }

  UpdateLikes(video: VideoModel){
    this.bookmarkService.addVideo(video);
    // this.ratedVideos.push(video);
    // this.OrderVideosList()
  }
}
