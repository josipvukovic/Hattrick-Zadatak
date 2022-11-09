import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatchService } from '../service/match.service';
import { FootballCroatiaDataSource, Match } from './football-croatia-datasource';

@Component({
  selector: 'app-football-croatia',
  templateUrl: './football-croatia.component.html',
  styleUrls: ['./football-croatia.component.css']
})
export class FootballCroatiaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Match>;
  dataSource: FootballCroatiaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  constructor(private matchService: MatchService) {
    this.dataSource = new FootballCroatiaDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getFootballCroatia();
  }

  getFootballCroatia(){
    this.matchService.getFootballCroatia()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    );
  }
}
