import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatchService } from '../service/match.service';
import { FootballSpainDataSource, Match } from './football-spain-datasource';

@Component({
  selector: 'football-spain',
  templateUrl: './football-spain.component.html',
  styleUrls: ['./football-spain.component.css']
})
export class FootballSpainComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Match>;
  dataSource: FootballSpainDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  constructor(private matchService: MatchService) {
    this.dataSource = new FootballSpainDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getFootballSpain();
  }

  getFootballSpain(){
    this.matchService.getFootballSpain()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    );
  }
}
