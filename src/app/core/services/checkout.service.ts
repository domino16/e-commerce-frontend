import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Purchase } from '../interfaces/purchase';
import { PaymentInfo } from '../interfaces/payment-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
private readonly http =  inject(HttpClient)

  private purchaseUrl = environment.apiUrl + '/checkout/purchase';

  private paymentIntentUrl = environment.apiUrl + '/checkout/payment-intent'


  placeOrder(purchase: Purchase):Observable<{orderTrackingNumber:string}>{
      return this.http.post<{orderTrackingNumber:string}>(this.purchaseUrl, purchase)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPaymentIntent(paymentInfo: PaymentInfo):Observable<any>{
    return this.http.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo)
  }
}
