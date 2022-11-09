import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatchService } from '../service/match.service';
import { FootballEnglandDataSource, Match } from './football-england-datasource';

@Component({
  selector: 'app-football-england',
  templateUrl: './football-england.component.html',
  styleUrls: ['./football-england.component.css']
})
export class FootballEnglandComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Match>;
  dataSource: FootballEnglandDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  constructor(private matchService: MatchService) {
    this.dataSource = new FootballEnglandDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getFootballEngland();
  }

  getFootballEngland(){
    this.matchService.getFootballEngland()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    );
  }
}
