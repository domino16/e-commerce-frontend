import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInfo } from 'src/app/core/interfaces/payment-info';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development';
import { CartService } from 'src/app/core/services/cart.service';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';
import { Observable, catchError, map, noop } from 'rxjs';
import { Purchase } from 'src/app/core/interfaces/purchase';
import { Address } from 'src/app/core/interfaces/address';
import { Customer } from 'src/app/core/interfaces/customer';
import { Order } from 'src/app/core/interfaces/order';
import { OrderItem } from 'src/app/core/interfaces/order-item';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LayoutService } from 'src/app/core/services/layout.service';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckoutSummaryComponent, RouterOutlet],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private readonly layoutService = inject(LayoutService)
  private readonly checkoutService = inject(CheckoutService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  totalPrice = 0;
  orderItems: OrderItem[] = this.cartService.cartItems.map(item => {
    return {
      imageUrl: item.imageUrl,
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };
  });

  countries$ = this.checkoutService.getCountries();
  states$: Observable<string[]> = this.checkoutService.getStates('pl');

  stripe: Stripe | null = null;
  elements!: StripeElements;
  paymentInfo!: PaymentInfo;

  isLoading: boolean = false;

  purchase: Purchase | undefined;
  

  ngOnInit() {
    this.layoutService.addOverflowHidden()
    this.stripeInitialization();
    this.countriesAndStateHandling();

    //subscriptions
    this.cartService.totalPrice
      .pipe(untilDestroyed(this))
      .subscribe(price => (this.totalPrice = price));
  }

  ngOnDestroy(): void {
    this.layoutService.removeOverflowHidden();
  }

  async stripeInitialization() {
    this.stripe = await loadStripe(environment.stripeKey);
  }

  setupStripeForm() {
    this.paymentInfo = {
      amount: Math.round(this.totalPrice * 100),
      currency: 'pln',
      receiptEmail: this.purchase?.customer.email as string,
    };
    this.checkoutService
      .createPaymentIntent(this.paymentInfo)
      .pipe(untilDestroyed(this))
      .subscribe(paymentIntent => {
        this.elements = this.stripe!.elements({
          clientSecret: paymentIntent.client_secret,
        });
        const paymentElement = this.elements.create('payment');
        paymentElement.mount('#payment-element');
      });
  }

  checkoutFormGroup = new FormGroup({
    customer: new FormGroup({
      firstName: new FormControl('Dominik', [Validators.required, Validators.minLength(2)]),

      lastName: new FormControl('Pietrzyk', [Validators.required, Validators.minLength(2)]),

      email: new FormControl('domino16-9@o2.pl', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    }),
    shippingAddress: new FormGroup({
      street: new FormControl('', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('Widawa', [Validators.required, Validators.minLength(2)]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      zipCode: new FormControl('98-170', [Validators.required, Validators.minLength(2)]),
    }),
  });

  submitForm() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    const customer: Customer = {
      firstName: this.firstName?.value as string,
      lastName: this.lastName?.value as string,
      email: this.email?.value as string,
    };
    const address: Address = {
      street: this.shippingAddressStreet?.value as string,
      city: this.shippingAddressCity?.value as string,
      state: this.shippingAddressState?.value as string,
      country: this.shippingAddressCountry?.value as string,
      zipCode: this.shippingAddressZipCode?.value as string,
    };
    const order: Order = { totalPrice: this.totalPrice, totalQuantity: 3 };
    const orderItems: OrderItem[] = this.orderItems;

    this.purchase = {
      customer,
      shippingAddress: address,
      billingAddress: address,
      order,
      orderItems,
    };
    this.setupStripeForm();
  }

  // eslint-disable-next-line max-lines-per-function
  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;

    this.stripe!.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/payment-status`,
      },
      redirect: 'if_required',
    })
      .then(result => {
        if (result.error) {
          this.router.navigate(['payment-status'], {
            relativeTo: this.route,
            queryParams: { redirect_status: 'failed', error_message: result.error.message },
          });
        } else {
          this.checkoutService
            .placeOrder(this.purchase!)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: response => {
                this.router.navigate(['payment-status'], {
                  relativeTo: this.route,
                  queryParams: {
                    redirect_status: 'succeeded',
                    tracking_number: response.orderTrackingNumber,
                  },
                });
                this.cartService.resetCart();
              },
              error: err => {
                alert(`There was an error: ${err.message}`);
              },
            });
        }
        return noop;
      })
      .catch(e => console.log(e));
    this.isLoading = false;
  }

  countriesAndStateHandling() {
    this.shippingAddressCountry?.valueChanges.pipe(untilDestroyed(this)).subscribe(country => {
      this.setStates(country!);
    });
    this.shippingAddressCountry?.setValue('PL');
  }

  setStates(key: string) {
    if (key) {
      this.states$ = this.checkoutService.getStates(key).pipe(
        catchError(() => {
          return this.countries$.pipe(
            map(countries => {
              return [countries.find(country => country.key === key)!.value];
            }),
          );
        }),
      );
    }
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
}
