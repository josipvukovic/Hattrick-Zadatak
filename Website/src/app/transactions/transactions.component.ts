import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatchService } from '../service/match.service';
import { TransactionsDataSource, TransactionsItem } from './transactions-datasource';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TransactionsItem>;
  dataSource: TransactionsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dateTime', 'transaction', 'toAccount', 'fromAccount', 'availableAmount'];

  constructor(private matchService: MatchService) {
    this.dataSource = new TransactionsDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getTransactions();
  }

  //GET data and populate data table with response
  getTransactions(){
    this.matchService.getTransactions()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    );
  }
}
