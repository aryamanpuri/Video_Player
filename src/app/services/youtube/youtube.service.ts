import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private BASE_URL: string = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
  private API_KEY: string = "AIzaSyCEX7-Dwk6NtjYuqL3lIt3Cw1lsYJ57SKk";

  constructor(private httpClient: HttpClient) {

   }

   getVideos(videoSearch: string): Observable<any>{
        let fullUrl = `${this.BASE_URL}${videoSearch}&key=${this.API_KEY}`;
        return this.httpClient.get<any>(fullUrl);
   }
}
