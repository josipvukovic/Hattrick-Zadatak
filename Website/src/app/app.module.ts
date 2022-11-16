import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketAssetComponent } from './ticket-asset/ticket-asset.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { FootballCroatiaComponent } from './football-croatia/football-croatia.component';
import { FootballEnglandComponent } from './football-england/football-england.component';
import { FootballSpainComponent } from './football-spain/football-spain.component';
import { FootballItalyComponent } from './football-italy/football-italy.component';
import { ToastrModule } from 'ngx-toastr';
import { TicketComponent } from './ticket/ticket.component';
import { MatIconModule } from '@angular/material/icon';
import { TicketService } from './service/ticket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmittedTicketsComponent } from './submitted-tickets/submitted-tickets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransactionsComponent } from './transactions/transactions.component';
import { DepositComponent } from './deposit/deposit.component';
import { BasketballNbaComponent } from './basketball-nba/basketball-nba.component';
import { BasketballEuroleagueComponent } from './basketball-euroleague/basketball-euroleague.component';
import { TennisWimbledonComponent } from './tennis-wimbledon/tennis-wimbledon.component';
import { TennisAtpUmagComponent } from './tennis-atp-umag/tennis-atp-umag.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DataTableComponent,
    TicketAssetComponent,
    SpecialOfferComponent,
    FootballCroatiaComponent,
    FootballEnglandComponent,
    FootballSpainComponent,
    FootballItalyComponent,
    TicketComponent,
    SubmittedTicketsComponent,
    TransactionsComponent,
    DepositComponent,
    BasketballNbaComponent,
    BasketballEuroleagueComponent,
    TennisWimbledonComponent,
    TennisAtpUmagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
