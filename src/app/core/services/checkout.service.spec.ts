/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { CheckoutService } from './checkout.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Purchase } from '../interfaces/purchase';
import { environment } from '../../../environments/environment.development';
import { PaymentInfo } from '../interfaces/payment-info';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CheckoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('#placeOrder should return tracking number', done => {
    const purchaseUrl = environment.apiUrl + '/checkout/purchase';
    const mockPurchase: Purchase = {} as Purchase;
    const mockResponse = { orderTrackingNumber: '123456789' };

    service.placeOrder(mockPurchase).subscribe((response: { orderTrackingNumber: string }) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(purchaseUrl);

    expect(req.request.method).toEqual('POST');

    req.flush(mockResponse);
  });

  it('#createPaymentIntent should send post request and return observalble', done => {
    const url = environment.apiUrl + '/checkout/payment-intent'
    const mockPaymentInfo:PaymentInfo = {amount: 20.99, currency: 'USD', receiptEmail: 'abc@example.com'}
    const mockResponse = {}

    service.createPaymentIntent(mockPaymentInfo).subscribe(response => {
        expect(response).toEqual(mockResponse)
    done()
})    
const request = httpMock.expectOne(url);
    expect(request.request.method).toEqual('POST')

    request.flush(mockResponse);
    })   

  it('#getCountries should return Observable<{value:string, key:string}[]>', done => {
    const url = 'https://restcountries.com/v3.1/independent?status=true&fields=name,cca2';
    const mockResponse = [{ name: { common: 'poland' }, cca2: 'pl' }];

    service.getCountries().subscribe(response => {
      expect(response).toEqual([{ value: 'poland', key: 'pl' }]);
      done();
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(mockResponse)
  });

  it('#getStates should return Observable<string[]>', done => {
    const url = 'https://referential.p.rapidapi.com/v1/state?iso_a2=keystring&lang=pl';
    const mockResponse = [{value:"valuestring", key:'keystring'}];

    service.getStates(mockResponse[0].key).subscribe(response => {
      expect(response).toEqual([mockResponse[0].value]);
      done();
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(mockResponse)
  });
});
