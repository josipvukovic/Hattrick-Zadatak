import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from '../models/ticket.model';
import { MatchService } from '../service/match.service';
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
  storedBets: Ticket [] = [];
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];
  // ticket: Ticket = new Ticket;
  ticket = {} as Ticket
  
  constructor(private matchService: MatchService,private toastr: ToastrService) {
    this.dataSource = new SpecialOfferDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    sessionStorage.setItem("allowSpecialOffer", "1");

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
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    if(newStoredBets2){
      this.storedBets = newStoredBets2;
    }
  }

  betHomeWin(row: any){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    var duplicate = false;
    var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
    console.log(allowSpecialOffer);

    var ticket: Ticket = {
      matchId: 0,
      competition: '',
      homeTeam: '',
      awayTeam: '',
      bet: '',
      odd: 0,
      specialOffer: 0
    }; 
    console.log(allowSpecialOffer);

    if(allowSpecialOffer === '1'){

      if(newStoredBets2){
        newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
          if(obj.matchId === row.matchId){
            obj.odd = row.homeWin;
            obj.bet = "1";
            duplicate = true;
            console.log("DUPLICATE!");
          }
        });
        } 
    
        ticket.matchId = row.matchId;
        ticket.competition = row.competition;
        ticket.homeTeam = row.homeTeam;
        ticket.awayTeam = row.awayTeam;
        ticket.bet = "1";
        ticket.odd = row.homeWin;
        ticket.specialOffer = 1;
        sessionStorage.setItem("allowSpecialOffer", "0");
        
        if(duplicate == false){
          this.storedBets.push(ticket);
        }
    
        sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
    }
    else {
      newStoredBets2.forEach(obj => { 

        if(obj.matchId === row.matchId){
          obj.odd = row.homeWin;
          obj.bet = "1";
          duplicate = true;
          sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
          console.log("ELSE DUPLICATE!");
        }
        else{
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      });
    }
    

    var newStoredBets = sessionStorage.getItem("ticketBets");
    newStoredBets2 = JSON.parse(newStoredBets!);
    console.log(newStoredBets2)
    
    this.toggle = !this.toggle;
  }

  betDraw(row: any){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    var duplicate = false;
    var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
    console.log(allowSpecialOffer);

    var ticket: Ticket = {
      matchId: 0,
      competition: '',
      homeTeam: '',
      awayTeam: '',
      bet: '',
      odd: 0,
      specialOffer: 0
    }; 
    console.log(allowSpecialOffer);

    if(allowSpecialOffer === '1'){

      if(newStoredBets2){
        newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
          if(obj.matchId === row.matchId){
            obj.odd = row.draw;
            obj.bet = "X";
            duplicate = true;
            console.log("DUPLICATE!");
          }
        });
        } 
    
        ticket.matchId = row.matchId;
        ticket.competition = row.competition;
        ticket.homeTeam = row.homeTeam;
        ticket.awayTeam = row.awayTeam;
        ticket.bet = "X";
        ticket.odd = row.draw;
        ticket.specialOffer = 1;
        sessionStorage.setItem("allowSpecialOffer", "0");
        
        if(duplicate == false){
          this.storedBets.push(ticket);
        }
    
        sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
    }
    else {
      newStoredBets2.forEach(obj => { 

        if(obj.matchId === row.matchId){
          obj.odd = row.draw;
          obj.bet = "X";
          duplicate = true;
          sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
          console.log("ELSE DUPLICATE!");
        }
        else{
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      });
    }
    

    var newStoredBets = sessionStorage.getItem("ticketBets");
    newStoredBets2 = JSON.parse(newStoredBets!);
    console.log(newStoredBets2)
    
    this.toggle = !this.toggle;
  }

  betAwayWin(row: any){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    var duplicate = false;
    var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
    console.log(allowSpecialOffer);

    var ticket: Ticket = {
      matchId: 0,
      competition: '',
      homeTeam: '',
      awayTeam: '',
      bet: '',
      odd: 0,
      specialOffer: 0
    }; 
    console.log(allowSpecialOffer);

    if(allowSpecialOffer === '1'){

      if(newStoredBets2){
        newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
          if(obj.matchId === row.matchId){
            obj.odd = row.awayWin;
            obj.bet = "2";
            duplicate = true;
            console.log("DUPLICATE!");
          }
        });
        } 
    
        ticket.matchId = row.matchId;
        ticket.competition = row.competition;
        ticket.homeTeam = row.homeTeam;
        ticket.awayTeam = row.awayTeam;
        ticket.bet = "2";
        ticket.odd = row.awayWin;
        ticket.specialOffer = 1;
        sessionStorage.setItem("allowSpecialOffer", "0");
        
        if(duplicate == false){
          this.storedBets.push(ticket);
        }
    
        sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
    }
    else {
      newStoredBets2.forEach(obj => { 

        if(obj.matchId === row.matchId){
          obj.odd = row.awayWin;
          obj.bet = "2";
          duplicate = true;
          sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
          console.log("ELSE DUPLICATE!");
        }
        else{
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      });
    }
    

    var newStoredBets = sessionStorage.getItem("ticketBets");
    newStoredBets2 = JSON.parse(newStoredBets!);
    console.log(newStoredBets2)

    this.toggle = !this.toggle;
  }

  betHomeOrDraw(row: any){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    var duplicate = false;
    var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
    console.log(allowSpecialOffer);

    var ticket: Ticket = {
      matchId: 0,
      competition: '',
      homeTeam: '',
      awayTeam: '',
      bet: '',
      odd: 0,
      specialOffer: 0
    }; 
    console.log(allowSpecialOffer);

    if(allowSpecialOffer === '1'){

      if(newStoredBets2){
        newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
          if(obj.matchId === row.matchId){
            obj.odd = row.homeOrDraw;
            obj.bet = "1X";
            duplicate = true;
            console.log("DUPLICATE!");
          }
        });
        } 
    
        ticket.matchId = row.matchId;
        ticket.competition = row.competition;
        ticket.homeTeam = row.homeTeam;
        ticket.awayTeam = row.awayTeam;
        ticket.bet = "1X";
        ticket.odd = row.homeOrDraw;
        ticket.specialOffer = 1;
        sessionStorage.setItem("allowSpecialOffer", "0");
        
        if(duplicate == false){
          this.storedBets.push(ticket);
        }
    
        sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
    }
    else {
      newStoredBets2.forEach(obj => { 

        if(obj.matchId === row.matchId){
          obj.odd = row.homeOrDraw;
          obj.bet = "1X";
          duplicate = true;
          sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
          console.log("ELSE DUPLICATE!");
        }
        else{
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      });
    }
    

    var newStoredBets = sessionStorage.getItem("ticketBets");
    newStoredBets2 = JSON.parse(newStoredBets!);
    console.log(newStoredBets2)

    this.toggle = !this.toggle;
  }

  betAwayOrDraw(row: any){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    var duplicate = false;
    var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
    console.log(allowSpecialOffer);

    var ticket: Ticket = {
      matchId: 0,
      competition: '',
      homeTeam: '',
      awayTeam: '',
      bet: '',
      odd: 0,
      specialOffer: 0
    }; 
    console.log(allowSpecialOffer);

    if(allowSpecialOffer === '1'){

      if(newStoredBets2){
        newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
          if(obj.matchId === row.matchId){
            obj.odd = row.awayOrDraw;
            obj.bet = "X2";
            duplicate = true;
            console.log("DUPLICATE!");
          }
        });
        } 
    
        ticket.matchId = row.matchId;
        ticket.competition = row.competition;
        ticket.homeTeam = row.homeTeam;
        ticket.awayTeam = row.awayTeam;
        ticket.bet = "X2";
        ticket.odd = row.awayOrDraw;
        ticket.specialOffer = 1;
        sessionStorage.setItem("allowSpecialOffer", "0");
        
        if(duplicate == false){
          this.storedBets.push(ticket);
        }
    
        sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
    }
    else {
      newStoredBets2.forEach(obj => { 

        if(obj.matchId === row.matchId){
          obj.odd = row.awayOrDraw;
          obj.bet = "X2";
          duplicate = true;
          sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
          console.log("ELSE DUPLICATE!");
        }
        else{
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      });
    }
    

    var newStoredBets = sessionStorage.getItem("ticketBets");
    newStoredBets2 = JSON.parse(newStoredBets!);
    console.log(newStoredBets2)
    
    this.toggle = !this.toggle;
  }

  betHomeOrAway(row: any){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    var duplicate = false;
    var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");
    console.log(allowSpecialOffer);

    var ticket: Ticket = {
      matchId: 0,
      competition: '',
      homeTeam: '',
      awayTeam: '',
      bet: '',
      odd: 0,
      specialOffer: 0
    }; 
    console.log(allowSpecialOffer);

    if(allowSpecialOffer === '1'){

      if(newStoredBets2){
        newStoredBets2.forEach(obj => { console.log("MatchId: " + obj.matchId)
          if(obj.matchId === row.matchId){
            obj.odd = row.homeOrAway;
            obj.bet = "12";
            duplicate = true;
            console.log("DUPLICATE!");
          }
        });
        } 
    
        ticket.matchId = row.matchId;
        ticket.competition = row.competition;
        ticket.homeTeam = row.homeTeam;
        ticket.awayTeam = row.awayTeam;
        ticket.bet = "12";
        ticket.odd = row.homeOrAway;
        ticket.specialOffer = 1;
        sessionStorage.setItem("allowSpecialOffer", "0");
        
        if(duplicate == false){
          this.storedBets.push(ticket);
        }
    
        sessionStorage.setItem("ticketBets", JSON.stringify(this.storedBets));
    }
    else {
      newStoredBets2.forEach(obj => { 

        if(obj.matchId === row.matchId){
          obj.odd = row.homeOrAway;
          obj.bet = "12";
          duplicate = true;
          sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));
          console.log("ELSE DUPLICATE!");
        }
        else{
          this.toastr.error('Ne možete kombinirati više parova iz Top ponude!', 'Greška');
        }
      });
    }
    

    var newStoredBets = sessionStorage.getItem("ticketBets");
    newStoredBets2 = JSON.parse(newStoredBets!);
    console.log(newStoredBets2)
    
    this.toggle = !this.toggle;
  }

}
