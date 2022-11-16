import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatchDetails } from '../models/match-details.model';
import { MatchService } from '../service/match.service';
import { TicketService } from '../service/ticket.service';
import { SpecialOfferDataSource, SpecialOffer } from './special-offer-datasource';

@Component({
  selector: 'special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.css']
})
export class SpecialOfferComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SpecialOffer>;
  dataSource: SpecialOfferDataSource;
  toggle = true;
  status = 'Enable';
  storedBets: MatchDetails [] = [];
  showError = true;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  ticket = {} as MatchDetails
  
  constructor(private matchService: MatchService,private toastr: ToastrService, private ticketService: TicketService) {
    this.dataSource = new SpecialOfferDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.getSpecialOfferMatches();
    this.getTicketData();
  }

  getSpecialOfferMatches(){
    this.matchService.getSpecialOfferMatches()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    )
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
      console.log("allowSpecialOffer: ");
      console.log(allowSpecialOffer);
  
      var ticket: MatchDetails = {
        matchId: 0,
        competition: '',
        homeTeam: '',
        awayTeam: '',
        bet: '',
        odd: 0,
        specialOffer: 0
      }; 
      console.log(allowSpecialOffer);
  
      if(allowSpecialOffer!.toString() > '0'){
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.homeWin;
              obj.bet = "1";
              obj.specialOffer = 2;
              duplicate = true;
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
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
            ticket.specialOffer = 2;
            sessionStorage.setItem("allowSpecialOffer", "0");
    
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          }
      
          sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
      }
      else {
        this.showError = true;
        newStoredBets2.forEach(obj => { 
  
          if(obj.matchId === row.matchId){
  
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal /= obj.odd;
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            obj.odd = row.homeWin;
            obj.bet = "1";
            obj.specialOffer = 2;
  
            oddsTemp = sessionStorage.getItem("oddsTotal");
            oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= obj.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            duplicate = true;
            sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
            console.log("ELSE DUPLICATE!");
            this.toastr.success('Zamjena', '');
            this.showError = false;
          }
        });
        if(this.showError === true){
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      }
      
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
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
        specialOffer: 0
      }; 
      console.log(allowSpecialOffer);
  
      if(allowSpecialOffer!.toString() > '0'){
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.draw;
              obj.bet = "X";
              obj.specialOffer = 2;
              duplicate = true;
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
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
            ticket.specialOffer = 2;
            sessionStorage.setItem("allowSpecialOffer", "0");
    
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          }
          sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
      }
      else {
        this.showError = true;
        newStoredBets2.forEach(obj => { 
  
          if(obj.matchId === row.matchId){
  
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal /= obj.odd;
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            obj.odd = row.draw;
            obj.bet = "X";
            duplicate = true;
  
            oddsTemp = sessionStorage.getItem("oddsTotal");
            oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= obj.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
            console.log("ELSE DUPLICATE!");
            this.toastr.success('Zamjena', '');
  
            this.showError = false;
          }
        });
        if(this.showError === true){
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      }
      
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
        specialOffer: 0
      }; 
      console.log(allowSpecialOffer);
  
      if(allowSpecialOffer!.toString() > '0'){
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.awayWin;
              obj.bet = "2";
              obj.specialOffer = 2;
              duplicate = true;
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
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
            ticket.specialOffer = 2;
            sessionStorage.setItem("allowSpecialOffer", "0");
    
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          }
          sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
      }
      else {
        this.showError = true;
        newStoredBets2.forEach(obj => { 
  
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
  
            sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
            console.log("ELSE DUPLICATE!");
            this.toastr.success('Zamjena', '');
  
            this.showError = false;
          }
        });
        if(this.showError === true){
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      }
  
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
        specialOffer: 0
      }; 
      console.log(allowSpecialOffer);
  
      if(allowSpecialOffer!.toString() > '0'){
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.homeOrDraw;
              obj.bet = "1X";
              obj.specialOffer = 2;
              duplicate = true;
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
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
            ticket.specialOffer = 2;
            sessionStorage.setItem("allowSpecialOffer", "0");
    
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          }

          sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
      }
      else {
        this.showError = true;
        newStoredBets2.forEach(obj => { 
  
          if(obj.matchId === row.matchId){
  
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal /= obj.odd;
            sessionStorage.setItem("oddsTotal", oddsTotal);
            
            obj.odd = row.homeOrDraw;
            obj.bet = "1X";
            duplicate = true;
  
            oddsTemp = sessionStorage.getItem("oddsTotal");
            oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= obj.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
            console.log("ELSE DUPLICATE!");
            this.toastr.success('Zamjena', '');
  
            this.showError = false;
          }
        });
        if(this.showError === true){
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      }

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
        specialOffer: 0
      }; 
      console.log(allowSpecialOffer);
  
      if(allowSpecialOffer!.toString() > '0'){
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
              
              obj.odd = row.awayOrDraw;
              obj.bet = "X2";
              obj.specialOffer = 2;
              duplicate = true;
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
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
            ticket.specialOffer = 2;
            sessionStorage.setItem("allowSpecialOffer", "0");
    
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          }
      
          sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
      }
      else {
        this.showError = true;
        newStoredBets2.forEach(obj => { 
  
          if(obj.matchId === row.matchId){
  
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal /= obj.odd;
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            obj.odd = row.awayOrDraw;
            obj.bet = "X2";
            duplicate = true;
  
            oddsTemp = sessionStorage.getItem("oddsTotal");
            oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= obj.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
            console.log("ELSE DUPLICATE!");
            this.toastr.success('Zamjena', '');
  
            this.showError = false;
          }
        });
        if(this.showError === true){
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
  
      }
      
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      this.ticketService.callToggle.next( true );
      this.toggle = !this.toggle;
    }
  }

  betHomeOrAway(row: any){

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
      var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
      console.log(allowSpecialOffer);
  
      var ticket: MatchDetails = {
        matchId: 0,
        competition: '',
        homeTeam: '',
        awayTeam: '',
        bet: '',
        odd: 0,
        specialOffer: 0
      }; 
      console.log(allowSpecialOffer);
  
      if(allowSpecialOffer!.toString() > '0'){
  
        if(newStoredBets2){
          newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
            if(obj.matchId === row.matchId){
  
              var oddsTemp = sessionStorage.getItem("oddsTotal");
              var oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal /= obj.odd;
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              obj.odd = row.homeOrAway;
              obj.bet = "12";
              obj.specialOffer = 2;
              duplicate = true;
  
              oddsTemp = sessionStorage.getItem("oddsTotal");
              oddsTotal = JSON.parse(oddsTemp!);
              oddsTotal *= obj.odd
              sessionStorage.setItem("oddsTotal", oddsTotal);
  
              this.toastr.success('Zamjena', '');
              console.log("DUPLICATE!");
            }
          });
          } 
              
          if(duplicate == false){
  
            ticket.matchId = row.matchId;
            ticket.competition = row.competition;
            ticket.homeTeam = row.homeTeam;
            ticket.awayTeam = row.awayTeam;
            ticket.bet = "12";
            ticket.odd = row.homeOrAway;
            ticket.specialOffer = 2;
            sessionStorage.setItem("allowSpecialOffer", "0");
    
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= ticket.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            this.storedBets.push(ticket);
          }
      
          sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
      }
      else {
        this.showError = true;
        newStoredBets2.forEach(obj => { 
  
          if(obj.matchId === row.matchId){
  
            var oddsTemp = sessionStorage.getItem("oddsTotal");
            var oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal /= obj.odd;
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            obj.odd = row.homeOrAway;
            obj.bet = "12";
            duplicate = true;
  
            oddsTemp = sessionStorage.getItem("oddsTotal");
            oddsTotal = JSON.parse(oddsTemp!);
            oddsTotal *= obj.odd
            sessionStorage.setItem("oddsTotal", oddsTotal);
  
            sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
            console.log("ELSE DUPLICATE!");
            this.toastr.success('Zamjena', '');
            this.showError = false;
          }
        });
        if(this.showError === true){
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      }
  
      var newStoredBets = sessionStorage.getItem("ticketBets");
      newStoredBets2 = JSON.parse(newStoredBets!);
      console.log(newStoredBets2)
      this.ticketService.callToggle.next( true );
      this.toggle = !this.toggle;
    }
  }

}
