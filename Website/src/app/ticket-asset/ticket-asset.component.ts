import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-asset',
  templateUrl: './ticket-asset.component.html',
  styleUrls: ['./ticket-asset.component.css']
})
export class TicketAssetComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['homeTeam', 'awayTeam', 'homeWin', 'draw', 'awayWin', 'homeOrDraw', 'awayOrDraw', 'homeOrAway', 'matchDateTime'];

  constructor() { }

  ngOnInit(): void {
  }

}
