import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Credit Card Payment';

  constructor(private router: Router){}


  proceedToPayment(){
    this.router.navigate(['/main']);
  }

  hasRoutes(route: string){
    return this.router.url === route;
  }

}


