import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatchService } from '../service/match.service';
import { MatchDetailsItem, SubmittedTicketsDataSource, SubmittedTicketsItem } from './submitted-tickets-datasource';

@Component({
  selector: 'app-submitted-tickets',
  templateUrl: './submitted-tickets.component.html',
  styleUrls: ['../app.component.css','./submitted-tickets.component.css']
})
export class SubmittedTicketsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SubmittedTicketsItem>;
  @ViewChild(MatTable) matchTable!: MatTable<MatchDetailsItem>;
  dataSource: SubmittedTicketsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketId', 'oddsTotal', 'betAmount', 'winningAmount'];
  matchDetailColumns = ['competition', 'homeTeam', 'awayTeam', 'bet', 'odd'];

  constructor(private matchService: MatchService) {
    this.dataSource = new SubmittedTicketsDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getTickets();
  }

  getTickets(){
    this.matchService.getTickets()
    .subscribe(
      response => {
        console.log('getTickets()')
        this.table.dataSource = response;
        console.log(this.table.dataSource)

        // this.matchTable = this.table.dataSource;
      }
    );
  }
  
}
