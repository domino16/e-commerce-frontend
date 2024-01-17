/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Purchase } from '../../core/interfaces/purchase';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { AppComponent } from '../../app.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl'; 


registerLocaleData(localePl, 'pl');

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let checkoutService: CheckoutService;
  let cartService: CartService;
  let router: Router;

  const mockStripeElements = {
    create: jest.fn().mockReturnThis(),
    mount: jest.fn(),
  };

  const mockStripeInstance = {
    elements: jest.fn().mockReturnValue(mockStripeElements),
    confirmPayment: jest.fn(),
  };

  const createComponent = async (locale: string) => {
    await TestBed.configureTestingModule({
      imports: [
        CheckoutComponent,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AppComponent },
          { path: 'checkout', component: CheckoutComponent },
          { path: '**', redirectTo: '' },
        ]),
      ],
      providers: [
        {
          provide: CheckoutService,
          useValue: {
            createPaymentIntent: jest.fn(),
            getCountries: jest.fn(),
            getStates: jest.fn(),
            placeOrder: jest.fn(),
          },
        },
        {
          provide: CartService,
          useValue: {
            resetCart: jest.fn(),
            cartItems: [{ id: '1', quantity: 124, unitPrice: 132, imageUrl: 'test', name: 'test' }],
            totalPrice: of(250.0),
          },
        },
        {
          provide: LOCALE_ID,
          useValue: locale,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    checkoutService = TestBed.inject(CheckoutService);
    cartService = TestBed.inject(CartService);

    component.stripe = mockStripeInstance as any;
  };

  it('should create', async() => {
    await createComponent('en')
    expect(component).toBeTruthy();
  });

  it('should set defaultLocale to "pl" when locale is "pl"', async() => {
    await createComponent('pl')
    expect(fixture.componentInstance.defaultLocale).toEqual('pl');
  });

  it('should handle totalPrice subscription', async() => {
    await createComponent('en')
    expect(component.totalPrice).toBe(250.0);
  });

  it('should map cartItem to orderItem ', async() => {
    await createComponent('en');
    expect(component.orderItems[0]).not.toBeUndefined()
  });

  it('should initialize checkout form with required controls', async() => {
    await createComponent('en')
    const checkoutFormGroup = component.checkoutFormGroup;

    expect(checkoutFormGroup.get('customer.firstName')).toBeTruthy();
    expect(checkoutFormGroup.get('customer.lastName')).toBeTruthy();
    expect(checkoutFormGroup.get('customer.email')).toBeTruthy();
    expect(checkoutFormGroup.get('shippingAddress.street')).toBeTruthy();
    expect(checkoutFormGroup.get('shippingAddress.city')).toBeTruthy();
    expect(checkoutFormGroup.get('shippingAddress.state')).toBeTruthy();
    expect(checkoutFormGroup.get('shippingAddress.country')).toBeTruthy();
    expect(checkoutFormGroup.get('shippingAddress.zipCode')).toBeTruthy();
  });

  it('should set default country to "PL" for shipping address', async() => {
    await createComponent('en')
    expect(component.shippingAddressCountry?.value).toBe('PL');
  });

  it('should setup stripe form and elements', async() => {
    await createComponent('en')
    component.totalPrice = 100;
    component.purchase = {
      customer: { email: 'test@example.com' },
    } as Purchase;

    const paymentIntent = { client_secret: 'test_client_secret' };
    jest.spyOn(checkoutService, 'createPaymentIntent').mockReturnValue(of(paymentIntent));

    component.setupStripeForm();

    expect(checkoutService.createPaymentIntent).toHaveBeenCalledWith({
      amount: 10000, // amount = totalPrice * 100 (centy)
      currency: 'pln',
      receiptEmail: 'test@example.com',
    });

    expect(mockStripeInstance.elements).toHaveBeenCalledWith({
      clientSecret: 'test_client_secret',
    });

    expect(mockStripeElements.create).toHaveBeenCalledWith('payment');
    expect(mockStripeElements.mount).toHaveBeenCalledWith('#payment-element');
  });

  it('#submitForm invalid should mark as touched()', async() => {
    await createComponent('en')
    component.submitForm();
    expect(component.checkoutFormGroup.touched).toBeTruthy();
  });

  it('#submitForm valid form should setup should call setupStripeForm()', async() => {
    await createComponent('en')
    const checkoutFormGroup = component.checkoutFormGroup;
    component.setupStripeForm = jest.fn();

    checkoutFormGroup.get('customer.firstName')?.setValue('name');
    checkoutFormGroup.get('customer.lastName')?.setValue('lastname');
    checkoutFormGroup.get('customer.email')?.setValue('name@example.com');
    checkoutFormGroup.get('shippingAddress.street')?.setValue('street');
    checkoutFormGroup.get('shippingAddress.city')?.setValue('city');
    checkoutFormGroup.get('shippingAddress.state')?.setValue('state');
    checkoutFormGroup.get('shippingAddress.country')?.setValue('country');
    checkoutFormGroup.get('shippingAddress.zipCode')?.setValue('00-000');

    const setupStripeFormSpy = jest.spyOn(component, 'setupStripeForm');

    component.submitForm();

    expect(setupStripeFormSpy).toHaveBeenCalled();
    expect(component.checkoutFormGroup.touched).not.toBeTruthy();
  });

  it('#onSubmit should return if this.isLoading is true', async() => {
    await createComponent('en')
    component.isLoading = true;
    component.onSubmit();
    expect(component.isLoading).toBeTruthy();
  });

  it('#onSubmit should navigate to payment-status on payment error', async () => {
    await createComponent('en')
    const mockError: any = { error: { message: 'Payment failed' } };
    jest.spyOn(component.stripe!, 'confirmPayment').mockResolvedValue(mockError);
    const routerSpy = jest.spyOn(router, 'navigate');

    await Promise.resolve(component.onSubmit());

    expect(routerSpy).toHaveBeenCalled();
  });

  it('#onSubmit should navigate to payment-status on payment succeeded and reset cart', async () => {
    await createComponent('en')
    jest.spyOn(checkoutService, 'placeOrder').mockReturnValue(of({ orderTrackingNumber: '1234' }));
    jest.spyOn(component.stripe!, 'confirmPayment').mockResolvedValue({} as never);
    const resetCartSpy = jest.spyOn(cartService, 'resetCart');
    const routerSpy = jest.spyOn(router, 'navigate');

    await Promise.resolve(component.onSubmit());

    expect(routerSpy).toHaveBeenCalled();
    expect(resetCartSpy).toHaveBeenCalled();
  });

  it('#onSubmit should placeOrder should retrun error', async () => {
    await createComponent('en')
    window.alert = jest.fn();
    const mockError = new Error('Error placing order');
    jest.spyOn(checkoutService, 'placeOrder').mockReturnValue(throwError(() => mockError));
    jest.spyOn(component.stripe!, 'confirmPayment').mockResolvedValue({} as never);
    const alertSpy = jest.spyOn(window, 'alert');

    await Promise.resolve(component.onSubmit());

    expect(alertSpy).toHaveBeenCalled();
  });

  it('#onSubmit should stripe should throw error', async () => {
    await createComponent('en')
    window.alert = jest.fn();
    const mockError = new Error('Error placing order');
    jest.spyOn(component.stripe!, 'confirmPayment').mockRejectedValue(mockError);
    const alertSpy = jest.spyOn(window, 'alert');

    await Promise.resolve(component.onSubmit());

    expect(alertSpy).toHaveBeenCalled();
  });

  it('#setStates should set states', fakeAsync(() => {
     createComponent('en')
    const mockErorr = new Error('http error');
    jest.spyOn(checkoutService, 'getStates').mockReturnValue(throwError(() => mockErorr));
    component.countries$ = of([{ key: 'pl', value: 'poland' }]);

    component.setStates('pl');

    component.states$.subscribe(states => {
      expect(states).toEqual(['poland']);
    });
    tick();
  }));
});
