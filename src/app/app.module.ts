import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPaymentComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
