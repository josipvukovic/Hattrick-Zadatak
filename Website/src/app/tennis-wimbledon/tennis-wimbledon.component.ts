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
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'awayWin', 'matchDateTime'];

  constructor(private matchService: MatchService, private toastr: ToastrService, private ticketService: TicketService) {
    this.dataSource = new TennisWimbledonDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.getTennisWimbledon();
    this.getTicketData();
  }

  getTennisWimbledon(){
    this.matchService.getTennisWimbledon()
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
  
      sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
  
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      console.log(this.storedBets);
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
}
