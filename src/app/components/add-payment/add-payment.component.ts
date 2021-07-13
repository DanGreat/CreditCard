import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { CreditCard } from 'src/app/model/creditCardModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit, OnDestroy {

  creditCardPaymentForm: FormGroup;

  creditCardNumber: FormControl = new FormControl;
  cardHolder: FormControl = new FormControl;
  securityCVVCode: FormControl = new FormControl;
  amount: FormControl = new FormControl;

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
        Validators.minLength(3),
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

  get cardValidationForm() {
    return this.creditCardPaymentForm.controls
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
