import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';
import { SpecialOffer } from '../models/special-offer.model';
import { Ticket } from '../models/ticket.model';

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

  // GET special offer matches
  getSpecialOfferMatches(): Observable<SpecialOffer[]>{
    return this.http.get<SpecialOffer[]>(this.baseUrl + '/GetSpecialOffer');
  }

  // GET football Croatian league matches
  getFootballCroatia(): Observable<Match[]>{
    return this.http.get<Match[]>(this.baseUrl + '/GetFootballCroatia');
  }

  // GET football England league matches
  getFootballEngland(): Observable<Match[]>{
    return this.http.get<Match[]>(this.baseUrl + '/GetFootballEngland');
  }

  // GET football Spain league matches
  getFootballSpain(): Observable<Match[]>{
    return this.http.get<Match[]>(this.baseUrl + '/GetFootballSpain');
  }    

  // GET football Italy league matches
  getFootballItaly(): Observable<Match[]>{
    return this.http.get<Match[]>(this.baseUrl + '/GetFootballItaly');
  }
  
  // getTicketMatches(): Observable<Ticket[]>{
  //   return this.http.get<Ticket[]>(this.baseUrl + '/GetTicketMatches');
  // }

  // addTicketMatch(ticket: Ticket): Observable<Ticket>{
  //   return this.http.post<Ticket>(this.baseUrl + '/AddTicketMatch', ticket);
  // }
}
