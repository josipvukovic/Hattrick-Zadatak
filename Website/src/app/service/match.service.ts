import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/card.mode';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  baseUrl = 'https://localhost:7292/api/Match';

  constructor(private http: HttpClient) { }

  // GET all matches
  getAllMatches(): Observable<Match[]>{
    return this.http.get<Match[]>(this.baseUrl);
  }

}
