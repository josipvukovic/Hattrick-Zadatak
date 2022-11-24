import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchOutcome } from '../models/match-outcome.model';
import { Match } from '../models/match.model';
import { SpecialOffer } from '../models/special-offer.model';
import { Ticket } from '../models/ticket.model';
import { Transaction } from '../models/transaction.model';

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

  getMatches(competition: string, specialOffer: boolean): Observable<Match[]>
  {
    return this.http.get<Match[]>(`https://localhost:7292/api/Match/GetMatches?competition=${competition}&specialOffer=${specialOffer}`);
  }

  // GET tickets
  getTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.baseUrl + '/GetTickets');
  }

  // Submit ticket
  addTicket(ticket: Ticket): Observable<Ticket>{
    return this.http.post<Ticket>(this.baseUrl + '/AddTicket', ticket);
  }

  // GET transactions
  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.baseUrl + '/GetTransactions');
  }

  // Submit ticket
  addTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(this.baseUrl + '/AddTransaction', transaction);
  }

  // Update match outcome for selected match
  updateMatchOutcome(match: MatchOutcome): Observable<MatchOutcome>{
    return this.http.put<MatchOutcome>(this.baseUrl + '/UpdateMatchOutcome', match);
  }
}
