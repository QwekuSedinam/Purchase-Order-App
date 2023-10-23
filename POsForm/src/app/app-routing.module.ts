import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { FormComponent } from './form/form.component';
import { StocksComponent } from './stocks/stocks.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',canActivate: [LoginGuard], component: ResultsComponent },
  { path: 'form',canActivate: [AuthGuard], component: FormComponent },
  { path: 'stock',canActivate: [AuthGuard], component: StocksComponent },
  { path: 'homepage',canActivate: [AuthGuard], component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
