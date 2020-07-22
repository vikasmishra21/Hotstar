import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PanelListsComponent } from './components/panel-lists/panel-lists.component';
import { AllocationComponent } from './components/allocation/allocation.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { LoginComponent } from './components/login/login.component';
import { CanActivateGuard } from './guards/can-activate.guard';

const childRoutes: Routes = [
  { path: '', redirectTo: 'PanelLists', pathMatch: 'full' },
  { path: 'PanelLists', component: PanelListsComponent, canActivate: [CanActivateGuard] },
  { path: 'Allocation', component: AllocationComponent, canActivate: [CanActivateGuard] },
  { path: 'Payments', component: PaymentsComponent, canActivate: [CanActivateGuard] },
  { path: '**', component: PageNotFoundComponent }
]

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },  
   { path: 'login', component: LoginComponent},
   { path: 'home', component: HomeComponent, children: childRoutes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
