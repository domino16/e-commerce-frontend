import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Purchase } from '../interfaces/purchase';
import { PaymentInfo } from '../interfaces/payment-info';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly http = inject(HttpClient);

  private purchaseUrl = environment.apiUrl + '/checkout/purchase';

  private paymentIntentUrl = environment.apiUrl + '/checkout/payment-intent';

  placeOrder(purchase: Purchase): Observable<{ orderTrackingNumber: string }> {
    return this.http.post<{ orderTrackingNumber: string }>(this.purchaseUrl, purchase);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.http.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }


  getCountries(): Observable<{value:string, key:string}[]>{

    interface Country{
      name:{common:string},
      cca2:string
    }

    return this.http.get<Country[]>('https://restcountries.com/v3.1/independent?status=true&fields=name,cca2').pipe(map((countries)=> countries.map(country => {return {value:country.name.common, key:country.cca2}}) ))
     
  }

  getStates(key:string):Observable<string[]> {
    const headers= {
      'X-RapidAPI-Key': '87833ab4d8msh8d57e6e5a21a838p109596jsn77becc6f671e',
      'X-RapidAPI-Host': 'referential.p.rapidapi.com'
    }
    let params = new HttpParams().set( 'iso_a2', key)
    params = params.set( 'lang', 'pl')


    return this.http
      .get<{value:string, key:string}[]>('https://referential.p.rapidapi.com/v1/state', {headers, params}).pipe(map(states => states.map(state => state.value)))
     
  }
}
