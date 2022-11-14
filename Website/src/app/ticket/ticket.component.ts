import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Ticket } from '../models/ticket.model';
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
  storedBets: Ticket [] = [];
  // oddsTotal = sessionStorage.setItem("oddsTotal", '1.55');
  oddsTotal: number = 1;
  betAmount: number = 10;
  winningAmount: number = 0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'dash', 'awayTeam', 'bet', 'odd', 'removeMatch'];
  betColumns = [ 'oddsTotal', 'betAmount', 'winningAmount', 'submitTicket'];

  constructor(private ticketService: TicketService) {
    this.dataSource = new TicketDataSource();
    this.ticketService.callToggle.subscribe(( data ) =>{
      this.getTicketData();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    sessionStorage.setItem("oddsTotal", '1');
    


    this.getTicketData();
    console.log(this.table.dataSource);
  }

  getTicketData(){
    console.log("getTicketData cALED!")
    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    if(newStoredBets2){
      this.storedBets = newStoredBets2;
    }
    var oddsTemp = sessionStorage.getItem("oddsTotal");
    var oddsTotal = JSON.parse(oddsTemp!);
    console.log("getTicketData()")
    console.log(oddsTotal);
    this.oddsTotal = oddsTotal;

    var  betAmountTemp = sessionStorage.getItem("betAmount");
    var betAmount = JSON.parse(betAmountTemp!);
    console.log("getTicketData()")
    console.log(oddsTotal);
    this.betAmount = betAmount;

    this.table.dataSource = this.storedBets;

    console.log("getTicketData!");


    const input = document.getElementById('betAmount') as HTMLInputElement | null;

    input?.addEventListener('input', function (event) {
      const target = event.target as HTMLInputElement;
      console.log(target.value);
      sessionStorage.setItem("betAmount", target.value); 
    });

    input?.addEventListener('input', i => {
      betAmountTemp = sessionStorage.getItem("betAmount");
      betAmount = JSON.parse(betAmountTemp!);
      this.winningAmount = this.oddsTotal * (betAmount *= 1 - 0.05);
    });

    // input?.addEventListener('input', this.updateTicket);
    // this.betAmount *= 1 - 0.05;

    // console.log(this.betAmount);
    // console.log(this.winningAmount);
    this.winningAmount = this.oddsTotal * (betAmount *= 1 - 0.05);
    // console.log(this.winningAmount);

  }

  submitTicket(){
    console.log("submitTicket() called!")
  }

  removeMatch(row: any){
    console.log(row);
    var newStoredBets = sessionStorage.getItem("ticketBets");
    var newStoredBets2: Ticket[] = JSON.parse(newStoredBets!);
    
    console.log(newStoredBets2);
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
          console.log(newStoredBets2);
          console.log(this.storedBets);
        }
        if(obj.specialOffer == 2){
          sessionStorage.setItem("allowSpecialOffer", "1");
          console.log("specialOffer=2")
        }
      });
      } 
  }
}
