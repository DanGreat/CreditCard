import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { CreditCard } from 'src/app/model/creditCardModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  creditCardPaymentForm: FormGroup;

  creditCardNumber: string = '';
  cardHolder: string = '';
  securityCVVCode: string = '';
  amount: number = 0;

  private creditCardSubscription: Subscription = new Subscription;


  constructor(private paymentService: PaymentServiceService,
              private formBuilder: FormBuilder) { 

    this.creditCardPaymentForm = this.formBuilder.group({
      creditCardNumber: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      cardHolder: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      securityCVVCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  ngOnInit(): void {
  }

  makePayment() {

    const payload: CreditCard = {
      creditCardNumber: this.creditCardPaymentForm.value.creditCardNumber,
      cardholder: this.creditCardPaymentForm.value.cardHolder,
      expirationDate: new Date(),
      securityCVVCode: this.creditCardPaymentForm.value.securityCVVCode,
      amount: this.creditCardPaymentForm.value.amount
    }
    
    this.creditCardSubscription = this.paymentService.makePayment(payload).subscribe(res => {
      console.log('Result: ', res);
    },
    (err) => console.log('Error: ', err))
  }

  ngOnDestroy(){
    this.creditCardSubscription.unsubscribe();
  }

}
