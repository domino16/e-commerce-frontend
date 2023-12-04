/* eslint-disable promise/always-return */
/* eslint-disable max-lines-per-function */
/* eslint-disable promise/catch-or-return */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectionStrategy, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInfo } from 'src/app/core/interfaces/payment-info';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/interfaces/cart-item';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Purchase } from 'src/app/core/interfaces/purchase';
import { Address } from 'src/app/core/interfaces/address';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development';
import { OrderItem } from 'src/app/core/interfaces/order-item';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  private readonly checkoutService = inject(CheckoutService);
  private readonly cartService = inject(CartService);

  totalPrice$ = this.cartService.totalPrice;
  totalPrice!: number;

  stripe: Stripe | null = null;
  paymentInfo!: PaymentInfo;

  isDisabled: boolean = false;

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
      street: new FormControl('Chociw', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('Widawa', [Validators.required, Validators.minLength(2)]),
      state: new FormControl('Lodzkie', [Validators.required]),
      country: new FormControl('PL', [Validators.required]),
      zipCode: new FormControl('98-170', [Validators.required, Validators.minLength(2)]),
    }),
    billingAddress: new FormGroup({
      street: new FormControl('Chociw', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('Widawa', [Validators.required, Validators.minLength(2)]),
      state: new FormControl('Lodzkie', [Validators.required]),
      country: new FormControl('PL', [Validators.required]),
      zipCode: new FormControl('98-170', [Validators.required, Validators.minLength(2)]),
    }),
    creditCard: new FormGroup({}),
  });

  cardElement: StripeCardElement | null = null;
  displayError: any = '';

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(environment.stripeKey);
    this.totalPrice$.pipe(untilDestroyed(this)).subscribe(a => (this.totalPrice = a));

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupStripePaymentForm();
    }, 3000);
  }

  setupStripePaymentForm() {
    if (this.stripe) {
      const elements = this.stripe.elements();

      console.log(elements);

      this.cardElement = elements.create('card', { hidePostalCode: true });

      this.cardElement.mount('#card-element');

      this.cardElement.on('change', (event: any) => {
        // get a handle to card-errors element
        this.displayError = document.getElementById('card-errors')!;

        if (event.complete) {
          this.displayError.textContent = '';
        } else if (event.error) {
          // show validation error to customer
          this.displayError.textContent = event.error.message;
        }
      });
    }
  }

  // eslint-disable-next-line max-lines-per-function
  onSubmit() {
    console.log('Handling the submit button');

    // if (this.checkoutFormGroup.invalid) {
    //   this.checkoutFormGroup.markAllAsTouched();
    //   return;
    // }

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */

    // - short way of doing the same thingy
    // create orderItems from cartItems
    // - long way
    
    const orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = {imageUrl: cartItems[i].imageUrl, unitPrice:cartItems[i].unitPrice, quantity:cartItems[i].quantity, productId:cartItems[i].id  };
    }

    // set up purchase
    const purchase: Purchase = {
      customer:{  firstName: this.checkoutFormGroup.controls['customer'].value.firstName!,
      lastName: this.checkoutFormGroup.controls['customer'].value.lastName!,
      email: this.checkoutFormGroup.controls['customer'].value.email!,},
      shippingAddress: this.checkoutFormGroup.controls['shippingAddress'].value as Address,
      billingAddress: this.checkoutFormGroup?.controls['billingAddress'].value as Address,
      order: {totalPrice:this.totalPrice, totalQuantity: 5},
      orderItems: orderItems,
    };

    this.paymentInfo = {amount: Math.round(this.totalPrice * 100),
    currency: "USD",
    receiptEmail: purchase.customer.email
    } 
 

    // if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === '') {
      this.isDisabled = true;
      this.checkoutService
        .createPaymentIntent(this.paymentInfo)
        .pipe(untilDestroyed(this))
        .subscribe(paymentIntentResponse => {
          this.stripe
            ?.confirmCardPayment(
              paymentIntentResponse.client_secret,
              {
                payment_method: {
                  card: this.cardElement!,
                  billing_details: {
                    email: purchase.customer.email,
                    name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
                    address: {
                      line1: purchase.billingAddress.street,
                      city: purchase.billingAddress.city,
                      state: purchase.billingAddress.state,
                      postal_code: purchase.billingAddress.zipCode,
                      country: 'PL',
                    },
                  },
                },
              },
              { handleActions: false },
            )
            .then(result => {
              if (result.error) {
                // inform the customer there was an error
                alert(`There was an error: ${result.error.message}`);
                this.isDisabled = false;
              } else {
                // call REST API via the CheckoutService
                this.checkoutService
                  .placeOrder(purchase)
                  .pipe(untilDestroyed(this))
                  .subscribe({
                    next: response => {
                      alert(
                        `Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`,
                      );

                      // reset cart
                      // this.resetCart();
                      this.isDisabled = false;
                    },
                    error: err => {
                      alert(`There was an error: ${err.message}`);
                      this.isDisabled = false;
                    },
                  });
              }
            });
        });
    } else {
      this.checkoutFormGroup.markAllAsTouched();
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

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
}
