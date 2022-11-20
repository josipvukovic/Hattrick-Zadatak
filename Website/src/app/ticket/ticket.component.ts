import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatchDetails } from '../models/match-details.model';
import { Ticket } from '../models/ticket.model';
import { Transaction } from '../models/transaction.model';
import { MatchService } from '../service/match.service';
import { TicketService } from '../service/ticket.service';
import { TicketDataSource, TicketItem } from './ticket-datasource';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TicketItem>;
  dataSource!: TicketDataSource;
  storedBets: MatchDetails [] = [];

  oddsTotal: number = 1;
  betAmount: number = 10;
  winningAmount: number = 0;
  availableAmount: number = 0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'dash', 'awayTeam', 'bet', 'odd', 'removeMatch'];
  betColumns = [ 'oddsTotal', 'betAmount', 'winningAmount', 'submitTicket'];

  constructor(private ticketService: TicketService, private matchService: MatchService, private toastr: ToastrService) {
    this.dataSource = new TicketDataSource();
    this.ticketService.callToggle.subscribe(( data ) =>{
      this.getTicketData();
    })
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    //set initial value if ticket is empty
    var oddsTemp = sessionStorage.getItem("oddsTotal");
    if (!oddsTemp){
      sessionStorage.setItem("oddsTotal", '1');
    }

    this.getAvailableAmount();
    this.getTicketData();
  }

  //Get all the ticket data
  getTicketData(){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: MatchDetails[] = JSON.parse(newStoredBets!);

    if(newStoredBets2){
      this.storedBets = newStoredBets2;
    }

    //Get odds total from session storage
    var oddsTemp = sessionStorage.getItem("oddsTotal");
    var oddsTotal = JSON.parse(oddsTemp!);
    this.oddsTotal = oddsTotal;

    //Get betting amount from session storage
    var betAmountTemp = sessionStorage.getItem("betAmount");
    if(!betAmountTemp) {betAmountTemp = '0'};
    var betAmount = JSON.parse(betAmountTemp!);

    this.betAmount = betAmount;
    this.table.dataSource = this.storedBets;

    const input = document.getElementById('betAmount') as HTMLInputElement | null;

    //Listen for changes on bet amount input field
    input?.addEventListener('input', function (event) {
      const target = event.target as HTMLInputElement;
      sessionStorage.setItem("betAmount", target.value); 
    });

    //Calculate winning amount on input change
    input?.addEventListener('input', i => {
      betAmountTemp = sessionStorage.getItem("betAmount");
      if(!betAmountTemp) {betAmountTemp = '0'};
      betAmount = JSON.parse(betAmountTemp!);
      this.winningAmount = this.oddsTotal * (betAmount *= 1 - 0.05);
      sessionStorage.setItem("winningAmount", JSON.stringify(this.winningAmount)); 
    });

    this.winningAmount = this.oddsTotal * (betAmount *= 1 - 0.05);
    sessionStorage.setItem("winningAmount", JSON.stringify(this.winningAmount)); 

  }

  submitTicket(){

    var allowSpecialOffer = sessionStorage.getItem("allowSpecialOffer");

    var betsString = sessionStorage.getItem("ticketBets");
    var bets: MatchDetails[] = JSON.parse(betsString!);
    ticket.matches = bets;

    var oddsTemp = sessionStorage.getItem("oddsTotal");
    var oddsTotal = JSON.parse(oddsTemp!);
    ticket.oddsTotal = oddsTotal;

    var betAmountTemp = sessionStorage.getItem("betAmount");
    if(!betAmountTemp) {betAmountTemp = '0'};
    var betAmount = JSON.parse(betAmountTemp!);
    ticket.betAmount = betAmount;

    var winningAmountTemp = sessionStorage.getItem("winningAmount");
    var winningAmount = JSON.parse(winningAmountTemp!);
    ticket.winningAmount = winningAmount.toFixed(2);

    this.getAvailableAmount();

    //if Special offer tip is added minimum number of tips is 6
    if(allowSpecialOffer == '0' && bets.length < 6){      
      this.toastr.error('Za kombinaciju s Top ponudom minimalan broj parova je 6!', 'Greška');
    }
    //ticket is empty
    else if(bets.length < 1){     
      this.toastr.error('Ne možete uplatiti prazan listić!', 'Greška');
    }
    //bet amount is bellow 5 HRK
    else if(!ticket.betAmount || ticket.betAmount < 5){     
      this.toastr.error('Minimalan ulog je 5 kn!', 'Greška');
    }
    else if(ticket.betAmount > this.availableAmount){
      this.toastr.error('Nedovoljno novca na računu!', 'Greška');
    }
    //Submit ticket
    else {    
      this.matchService.addTicket(ticket)
      .subscribe(
        response => {
          console.log(response);
        }
      );

      transaction.dateTime = new Date;
      transaction.fromAccount = ticket.betAmount;
      transaction.transaction = 'UPLATA LISTIĆA';
      transaction.availableAmount = this.availableAmount - ticket.betAmount;
      this.matchService.addTransaction(transaction)
      .subscribe(
        response => {
          console.log(response);
        }
      )
      this.toastr.success('Listić je uplaćen!', '');
    }

  }

  //Remove match from ticket
  removeMatch(row: any){

    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: MatchDetails[] = JSON.parse(newStoredBets!);
    
    if(newStoredBets2){

      newStoredBets2.forEach(obj => { 

        if(obj.matchId === row.matchId){
          
          newStoredBets2.splice(newStoredBets2.indexOf(obj), 1);
          sessionStorage.setItem("ticketBets", JSON.stringify(newStoredBets2));

          var oddsTemp = sessionStorage.getItem("oddsTotal");
          var oddsTotal = JSON.parse(oddsTemp!);
          oddsTotal /= obj.odd;
          sessionStorage.setItem("oddsTotal", oddsTotal);

          this.getTicketData();
        }
        //tip from special offer is removed
        if(row.specialOffer == 2){
          sessionStorage.setItem("allowSpecialOffer", "1");
        }
      });
      } 
  }

  //Get available amount 
  getAvailableAmount(){
    this.matchService.getTransactions()
    .subscribe(
      response => {
        this.availableAmount = response[response.length-1].availableAmount;
        sessionStorage.setItem("availableAmount", this.availableAmount.toString());
      }
    );
  }

}

//Initialize ticket object
var ticket: Ticket = {
  ticketId: 0,
  matches: [],
  oddsTotal: 0,
  betAmount: 0,
  winningAmount: 0
}; 

//Initialize transaction object
var transaction: Transaction = {
  transactionId: 0,
  dateTime: new Date,
  transaction: '',
  toAccount: 0,
  fromAccount: 0,
  availableAmount: 0
};
