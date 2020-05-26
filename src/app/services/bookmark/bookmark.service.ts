import { BehaviorSubject, Observable } from 'rxjs';
import { VideoModel } from '../../models/video.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private videos$: BehaviorSubject<VideoModel[]> = new BehaviorSubject<VideoModel[]>([]);
  private storageKey = 'bookmark';

  constructor() {
    this.videos$.next(this.getVideosFromStorage());
  }

  public selectVideos(): Observable<VideoModel[]> {
    return this.videos$;
  }

  public addVideo(video: VideoModel): void {
    // Firstly, we need to remove the old item if exists
    this.removeVideo(video);
    const videos = [video, ...this.videos$.value];
    this.updateVideos(videos);
  }

  private getVideosFromStorage(): VideoModel[] {
    let videos = [];
    try {
      videos = JSON.parse(localStorage.getItem(this.storageKey));
    } catch (e) {
      console.log(e);
    }
    return Array.isArray(videos) ? videos : [];
  }

  private updateVideosInStorage(videos: VideoModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(videos));
  }

  private removeVideo(video: VideoModel) {
    const videos = this.videos$.value.filter(item => item.videoId !== video.videoId);
    this.updateVideos(videos);
  }

  private updateVideos(videos: VideoModel[]) {
    this.videos$.next(videos);
    this.updateVideosInStorage(videos);
  }
}
