import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballCroatiaComponent } from './football-croatia/football-croatia.component';
import { FootballEnglandComponent } from './football-england/football-england.component';
import { FootballItalyComponent } from './football-italy/football-italy.component';
import { FootballSpainComponent } from './football-spain/football-spain.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';

const routes: Routes = 
[
      //routes
      { path: 'football-england', component: FootballEnglandComponent, data: { title: 'Football-England' } },      
      { path: 'football-croatia', component: FootballCroatiaComponent, data: { title: 'Football-Croatia' } },      
      { path: 'football-spain', component: FootballSpainComponent, data: { title: 'Football-Spain' } },      
      { path: 'football-italy', component: FootballItalyComponent, data: { title: 'Football-Italy' } },      
      { path: 'special-offer', component: SpecialOfferComponent, data: { title: 'Special-Offer' } },      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
