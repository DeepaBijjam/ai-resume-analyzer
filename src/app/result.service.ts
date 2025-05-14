import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  // private apiUrl = 'http://localhost:8093/api/score';

  // constructor(private http: HttpClient) {}

  // compareResume(): Observable<string> {
  //   return this.http.post(this.apiUrl, null, { responseType: 'text' });
  // }

  private apiUrl = 'https://backend-ai-resume-analyser.onrender.com/api/resumemarks';

  constructor(private http: HttpClient) {}

  compareResume(): Observable<string> {
    return this.http.post(this.apiUrl, null, { responseType: 'text' });
  }
}
