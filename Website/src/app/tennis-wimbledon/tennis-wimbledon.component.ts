import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatchDetails } from '../models/match-details.model';
import { MatchService } from '../service/match.service';
import { TicketService } from '../service/ticket.service';
import { TennisWimbledonDataSource, TennisWimbledonItem } from './tennis-wimbledon-datasource';

@Component({
  selector: 'tennis-wimbledon',
  templateUrl: './tennis-wimbledon.component.html',
  styleUrls: ['./tennis-wimbledon.component.css']
})
export class TennisWimbledonComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TennisWimbledonItem>;
  dataSource: TennisWimbledonDataSource;
  toggle = true;
  storedBets: MatchDetails [] = [];
  competition: string = 'Wimbledon';
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'awayWin', 'matchDateTime'];

  constructor(private matchService: MatchService, private toastr: ToastrService, private ticketService: TicketService) {
    this.dataSource = new TennisWimbledonDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getMatches(this.competition);
    this.getTicketData();
  }

  //GET data and populate data table with response
  getMatches(competition: string){
    this.matchService.getMatches(competition, false)
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

  betHomeWin(row: any){

    //Check if bet is forbidden
    if(row.homeWin == null) {
      this.toastr.error('Ne možete se kladiti na taj ishod!', 'Greška');
    }
    else {

      var newStoredBets = sessionStorage.getItem("ticketBets");
      var newStoredBets2: MatchDetails[] = JSON.parse(newStoredBets!);

      if(newStoredBets2){
        this.storedBets = newStoredBets2;
      }

      var duplicate = false;
  
        if(newStoredBets2){

          newStoredBets2.forEach(obj => {

            //Check if match is already on the ticket
            if(obj.matchId === row.matchId){

              //First remove existing odd from total odds
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.homeWin;
              obj.bet = "1";
              
              //Add new chosen odd to the total odds
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              duplicate = true;
              this.toastr.success('Zamjena', '');

              if(newStoredBets2){
                this.storedBets = newStoredBets2;
              };
            }
          });
          } 
                
          //If match was not on the ticket add it to the list
          if(duplicate == false){
  
            ticket.matchId = row.matchId;
            ticket.competition = row.competition;
            ticket.homeTeam = row.homeTeam;
            ticket.awayTeam = row.awayTeam;
            ticket.bet = "1";
            ticket.odd = row.homeWin;
            ticket.specialOffer = 1;
            ticket.matchOutcome = row.matchOutcome;
    
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          };
  
      sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));

      this.ticketService.callToggle.next( true );
      this.toggle = !this.toggle;
    }
  }

  betAwayWin(row: any){

    //Check if bet is forbidden
    if(row.awayWin == null) {
      this.toastr.error('Ne možete se kladiti na taj ishod!', 'Greška');
    }
    else {

      var newStoredBets = sessionStorage.getItem("ticketBets");
      var newStoredBets2: MatchDetails[] = JSON.parse(newStoredBets!);

      if(newStoredBets2){
        this.storedBets = newStoredBets2;
      }

      var duplicate = false;
  
        if(newStoredBets2){

          newStoredBets2.forEach(obj => { 
            
            //Check if match is already on the ticket
            if(obj.matchId === row.matchId){
  
              //First remove existing odd from total odds
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.awayWin;
              obj.bet = "2";
              duplicate = true;
  
              //Add new chosen odd to the total odds
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');

              if(newStoredBets2){
                this.storedBets = newStoredBets2;
              };
            }
          });
          } 
            
          //If match was not on the ticket add it to the list
          if(duplicate == false){
  
            ticket.matchId = row.matchId;
            ticket.competition = row.competition;
            ticket.homeTeam = row.homeTeam;
            ticket.awayTeam = row.awayTeam;
            ticket.bet = "2";
            ticket.odd = row.awayWin;
            ticket.specialOffer = 1;
            ticket.matchOutcome = row.matchOutcome;

            var  oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          }
      
      sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));

      this.ticketService.callToggle.next( true );
      this.toggle = !this.toggle;
    }
  }
}

//initialize ticket object
var ticket: MatchDetails = {
  matchId: 0,
  competition: '',
  homeTeam: '',
  awayTeam: '',
  bet: '',
  odd: 0,
  specialOffer: 0,
  matchOutcome: ''
}; 