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

  cardNumber = '';
  expiryDateText = '';

  creditCardPaymentForm: FormGroup;

  creditCardNumber: FormControl = new FormControl;
  cardHolder: FormControl = new FormControl;
  securityCVVCode: FormControl = new FormControl;
  expiryDate: FormControl = new FormControl;

  cardType = '../../../assets/mastercard-logo.png'
  card_error: boolean = true;

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
      expiryDate: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  get cardValidationForm() {
    return this.creditCardPaymentForm.controls
  }

  ngOnInit(): void {
  }

  validateCardNumber() {
    const cardNumber = this.creditCardPaymentForm.value.creditCardNumber;
    console.log('First Four: ', cardNumber.substring(0, 4));
    
    if(cardNumber.substring(0, 4) ===  '5399'){
      this.cardType = '../../../assets/mastercard-logo.png';
      this.card_error = false;
    }

    if(cardNumber.substring(0, 4) ===  '4399'){
      this.cardType = '../../../assets/visa-logo.png';
      this.card_error = false;
    }

    if(cardNumber.substring(0, 4) ===  '3999'){
      this.cardType = '../../../assets/verve-logo.png';
      this.card_error = false;
    }
  }

  formatCardNumber() {
    if (this.cardNumber) {
      this.cardNumber = this.cardNumber
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      this.creditCardPaymentForm.controls.creditCardNumber.patchValue(this.cardNumber);
      this.validateCardNumber();
    }
  }

  // autoAddSlash(ev: any) {

  //     if (this.cardValidationForm.expiryDate.value.length === 2) {
  //       this.creditCardPaymentForm.controls.expiryDate.patchValue(`${this.cardValidationForm.expiryDate.value}/`);
  //     }
  // }

  makePayment() {

    const payload: CreditCard = {
      creditCardNumber: this.creditCardPaymentForm.value.creditCardNumber.split(' ').join(''),
      cardholder: this.creditCardPaymentForm.value.cardHolder,
      expirationDate: this.creditCardPaymentForm.value.expiryDate,
      securityCVVCode: this.creditCardPaymentForm.value.securityCVVCode,
    }
    
    this.creditCardSubscription = this.paymentService.makePayment(payload).subscribe(res => {
      console.log('Result: ', res);
      this.cardNumber = '';
      this.creditCardPaymentForm.reset();
    },
    (err) => console.log('Error: ', err))
  }

  ngOnDestroy(){
    this.creditCardSubscription.unsubscribe();
  }

}
