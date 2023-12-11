import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/interfaces/cart-item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss'],
})
export class CheckoutSummaryComponent {
  private readonly cartService = inject(CartService);

  totalPrice$ = this.cartService.totalPrice;
  items: CartItem[] = this.cartService.cartItems;
}
