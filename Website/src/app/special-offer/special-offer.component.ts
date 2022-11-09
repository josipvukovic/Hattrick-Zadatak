import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  constructor(private matchService: MatchService) {
    this.dataSource = new SpecialOfferDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getSpecialOfferMatches();
  }

  getSpecialOfferMatches(){
    this.matchService.getSpecialOfferMatches()
    .subscribe(
      response => {
        this.table.dataSource = response;
      }
    )
  }
}
