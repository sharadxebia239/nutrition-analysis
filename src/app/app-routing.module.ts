import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' }, // no path redirect to home page
  {path: 'home', component: HomeComponent}, // home component route
  {path: 'summary', component: SummaryComponent }, // Summary component route
  {path: '**', component: NotfoundComponent}, //wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
