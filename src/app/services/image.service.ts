import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const IMAGE_API = 'http://localhost:8080/socnet/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(IMAGE_API + 'upload', uploadData);
  }

  uploadImageToPost(file: File, postId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(IMAGE_API + 'upload/' + postId, uploadData);
  }

  getImageToUser(): Observable<any> {
    return this.http.get(IMAGE_API + 'avatar');
  }

  getImageToPost(postId: number): Observable<any> {
    return this.http.get(IMAGE_API + postId);
  }
}
