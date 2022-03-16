import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../model/creditCardModel';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  savedData: Array<CreditCard> = [];

  constructor(private http: HttpClient) { }

  makePayment(payload: CreditCard) {
    this.savedData.push(payload);
    console.log(this.savedData);
    return of(true);
  }
}


