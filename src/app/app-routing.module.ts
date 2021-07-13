import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPaymentComponent } from './components/add-payment/add-payment.component'
import { MainComponent } from './components/main/main.component';
import { AuthenticationGuard } from './auth/authentication.guard';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/',
    pathMatch: 'full' 
  },
  { 
    path: 'addPayment',
    component: AddPaymentComponent 
  },
  { 
    path: 'main',
    canActivate: [AuthenticationGuard],
    component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
