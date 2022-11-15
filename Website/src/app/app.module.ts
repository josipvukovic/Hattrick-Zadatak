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
import { FormsModule } from '@angular/forms';
import { SubmittedTicketsComponent } from './submitted-tickets/submitted-tickets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransactionsComponent } from './transactions/transactions.component';


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
    TransactionsComponent
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
    MatFormFieldModule
  ],
  providers: [
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
