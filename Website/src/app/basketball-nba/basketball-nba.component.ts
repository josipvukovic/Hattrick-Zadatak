import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatchDetails } from '../models/match-details.model';
import { MatchService } from '../service/match.service';
import { TicketService } from '../service/ticket.service';
import { BasketballNbaDataSource, BasketballNbaItem } from './basketball-nba-datasource';

@Component({
  selector: 'basketball-nba',
  templateUrl: './basketball-nba.component.html',
  styleUrls: ['./basketball-nba.component.css']
})
export class BasketballNbaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BasketballNbaItem>;
  dataSource: BasketballNbaDataSource;
  toggle = true;
  storedBets: MatchDetails [] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'matchDateTime'];

  constructor(private matchService: MatchService, private toastr: ToastrService, private ticketService: TicketService) {
    this.dataSource = new BasketballNbaDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.getBasketballNBA();
    this.getTicketData();
  }

  getBasketballNBA(){
    this.matchService.getBasketballNBA()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    );
  }

  getTicketData(){
    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: MatchDetails[] = JSON.parse(newStoredBets!);
    if(newStoredBets2){
      this.storedBets = newStoredBets2;
    }
  }

  betHomeWin(row: any){

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
      var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
      console.log(allowSpecialOffer);
  
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
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => {
            if(obj.matchId === row.matchId){
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.homeWin;
              obj.bet = "1";
              
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              duplicate = true;
              console.log("DUPLICATE!");
              this.toastr.success('Zamjena', '');
              if(newStoredBets2){
                this.storedBets = newStoredBets2;
              };
            }
          });
          } 
                
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
          console.log(ticket);
  
          sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
      
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      console.log(this.storedBets);
      this.ticketService.callToggle.next( true );
  
      this.toggle = !this.toggle;
    }
  }

  betDraw(row: any){

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
      var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
      console.log(allowSpecialOffer);
  
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
      console.log(allowSpecialOffer);
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.draw;
              obj.bet = "X";
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              duplicate = true;
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
              if(newStoredBets2){
                this.storedBets = newStoredBets2;
              };   
            }
          });
          } 
                    
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
  
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      this.ticketService.callToggle.next( true );
  
      this.toggle = !this.toggle;
    }
  }

  betAwayWin(row: any){

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
      var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
      console.log(allowSpecialOffer);
  
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
      console.log(allowSpecialOffer);
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.awayWin;
              obj.bet = "2";
              duplicate = true;
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
              if(newStoredBets2){
                this.storedBets = newStoredBets2;
              };
            }
          });
          } 
            
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
        
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      this.ticketService.callToggle.next( true );
      this.toggle = !this.toggle;
    }
  }

  betHomeOrDraw(row: any){

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
      var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
      console.log(allowSpecialOffer);
  
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
      console.log(allowSpecialOffer);
  
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.homeOrDraw;
              obj.bet = "1X";
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              duplicate = true;
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
              if(newStoredBets2){
                this.storedBets = newStoredBets2;
              };
            }
          });
          } 
                
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
  
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      this.ticketService.callToggle.next( true );
  
      this.toggle = !this.toggle;
    }
  }

  betAwayOrDraw(row: any){

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
      var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
      console.log(allowSpecialOffer);
  
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
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.awayOrDraw;
              obj.bet = "X2";
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              duplicate = true;
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
              if(newStoredBets2){
                this.storedBets = newStoredBets2;
              };
            }
          });
          } 
               
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
  
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      this.ticketService.callToggle.next( true );
      this.toggle = !this.toggle;
    }
  }
}
