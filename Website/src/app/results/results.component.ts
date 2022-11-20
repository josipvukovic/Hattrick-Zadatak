import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatchDetails } from '../models/match-details.model';
import { MatchOutcome } from '../models/match-outcome.model';
import { MatchService } from '../service/match.service';
import { ResultsDataSource, ResultsItem } from './results-datasource';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ResultsItem>;
  dataSource: ResultsDataSource;
  toggle = true;
  storedBets: MatchDetails [] = [];
  betAmount: number = 10;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin'];

  constructor(private matchService: MatchService, private toastr: ToastrService) {
    this.dataSource = new ResultsDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getAllMatches();
    this.getTicketData();
  }

  //Get match data
  getAllMatches(){
    this.matchService.getAllMatches()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    );
  }

  //GET current ticket data from session
  getTicketData(){
    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: MatchDetails[] = JSON.parse(newStoredBets!);
    if(newStoredBets2){
      this.storedBets = newStoredBets2;
    }
  }

  //Update match outcome for the selected match
  updateMatchOutcome(match: MatchOutcome){
    this.matchService.updateMatchOutcome(match)
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  //Home win outcome logic
  resultHomeWin(row: any){

    match.matchId = row.matchId;
    match.matchOutcome = '1';

    this.updateMatchOutcome(match);
    this.toastr.success('Za meč ' + row.homeTeam + ' - ' + row.awayTeam + ' unijeli ste rezultat: ' + match.matchOutcome, '');
  }

  //Draw outcome logic
  resultDraw(row: any){

    if(row.draw == null) {
      this.toastr.error('Za ovaj sport ne možete odabrati taj ishod!', 'Greška');
    }
    else {

      match.matchId = row.matchId;
      match.matchOutcome = 'X';

      this.updateMatchOutcome(match);
      this.toastr.success('Za meč ' + row.homeTeam + ' - ' + row.awayTeam + ' unijeli ste rezultat: ' + match.matchOutcome, '');
    }
  }

  //Away win outcome logic
  resultAwayWin(row: any){

    match.matchId = row.matchId;
    match.matchOutcome = '2';

    this.updateMatchOutcome(match);
    this.toastr.success('Za meč ' + row.homeTeam + ' - ' + row.awayTeam + ' unijeli ste rezultat: ' + match.matchOutcome, '');
  }

}

//initialize match outcome object
var match: MatchOutcome = {
  
  matchId: 0,
  competition: '',
  homeTeam: '',
  awayTeam: '',
  homeWin: 0,
  draw: 0,
  awayWin: 0,
  homeOrDraw: 0,
  homeOrAway: 0,
  awayOrDraw:0,
  matchDateTime: '',
  specialOffer: false,
  matchOutcome: ''
  
}
