import { Component, OnInit } from '@angular/core';
import { MatchService } from './service/match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Hattrick';

  constructor(){
  }

  ngOnInit(): void {
  }

}
