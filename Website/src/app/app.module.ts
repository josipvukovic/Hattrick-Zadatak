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
    FootballItalyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
