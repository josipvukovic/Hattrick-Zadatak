import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, Match } from './data-table-datasource';
import { MatchService } from '../service/match.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Match>;
  dataSource: DataTableDataSource;
  toggle = true;
  status = 'Enable'; 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  constructor(private matchService: MatchService) {
    this.dataSource = new DataTableDataSource();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getAllMatches();
  }

  doAlert(row: any){
    console.log("data: " + row.homeTeam);
    this.toggle = !this.toggle;
  }

  getAllMatches(){
    this.matchService.getAllMatches()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    );
  }
}
