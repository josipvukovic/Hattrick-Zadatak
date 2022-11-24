import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatchDetails } from '../models/match-details.model';
import { MatchService } from '../service/match.service';
import { TicketService } from '../service/ticket.service';
import { FootballEnglandDataSource, Match } from './football-england-datasource';

@Component({
  selector: 'football-england',
  templateUrl: './football-england.component.html',
  styleUrls: ['./football-england.component.css']
})
export class FootballEnglandComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Match>;
  dataSource: FootballEnglandDataSource;
  toggle = true;
  storedBets: MatchDetails [] = [];
  competition: string = 'Engleska 1';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  constructor(private matchService: MatchService, private toastr: ToastrService, private ticketService: TicketService) {
    this.dataSource = new FootballEnglandDataSource();
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

  betDraw(row: any){

    //Check if bet is forbidden
    if(row.draw == null) {
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
  
              obj.odd = row.draw;
              obj.bet = "X";
  
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
            ticket.bet = "X";
            ticket.odd = row.draw;
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
  
              //Add new chosen odd to the total odds
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);

              this.toastr.success('Zamjena', '');
              duplicate = true;

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

  betHomeOrDraw(row: any){

    //Check if bet is forbidden
    if(row.homeOrDraw == null) {
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
  
              obj.odd = row.homeOrDraw;
              obj.bet = "1X";
  
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
            ticket.bet = "1X";
            ticket.odd = row.homeOrDraw;
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

  betAwayOrDraw(row: any){

    //Check if bet is forbidden
    if(row.awayOrDraw == null) {
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
  
              obj.odd = row.awayOrDraw;
              obj.bet = "X2";
  
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
            ticket.bet = "X2";
            ticket.odd = row.awayOrDraw;
            ticket.specialOffer = 1;
            ticket.matchOutcome = row.matchOutcome;

            var oddsTemp = sessionStorage.getItem("oddsTotal");
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

  betHomeOrAway(row: any){

    //Check if bet is forbidden
    if(row.homeOrAway == null) {
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
  
              obj.odd = row.homeOrAway;
              obj.bet = "12";
  
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
            ticket.bet = "12";
            ticket.odd = row.homeOrAway;
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
