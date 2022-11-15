import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballCroatiaComponent } from './football-croatia/football-croatia.component';
import { FootballEnglandComponent } from './football-england/football-england.component';
import { FootballItalyComponent } from './football-italy/football-italy.component';
import { FootballSpainComponent } from './football-spain/football-spain.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { SubmittedTicketsComponent } from './submitted-tickets/submitted-tickets.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = 
[
      //routes
      { path: '', component: SpecialOfferComponent, data: { title: 'Football-England' } },      
      { path: 'football-england', component: FootballEnglandComponent, data: { title: 'Football-England' } },      
      { path: 'football-croatia', component: FootballCroatiaComponent, data: { title: 'Football-Croatia' } },      
      { path: 'football-spain', component: FootballSpainComponent, data: { title: 'Football-Spain' } },      
      { path: 'football-italy', component: FootballItalyComponent, data: { title: 'Football-Italy' } },      
      { path: 'special-offer', component: SpecialOfferComponent, data: { title: 'Special-Offer' } },      
      { path: 'submitted-tickets', component: SubmittedTicketsComponent, data: { title: 'Listići' } },     
      { path: 'transactions', component: TransactionsComponent, data: { title: 'Listići' } },       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
