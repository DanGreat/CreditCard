import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../model/creditCardModel';
import { of, } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  savedData: Array<CreditCard> = [];

  constructor(private http: HttpClient) { }

  makePayment(payload: CreditCard) {
    this.savedData.push(payload);
    console.log(this.savedData);
    return this.http.post('', payload).pipe(
      tap(data => {
        console.log('Tapped Data: ', data);
      }),
      retry(2),
      catchError (e => {
        return of(`There was an error: ${e}`);
      })
    );
  }
}


