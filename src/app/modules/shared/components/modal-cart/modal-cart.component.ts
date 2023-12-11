import { Component, ChangeDetectionStrategy, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartInnerComponent } from './cart-inner/cart-inner.component';
import { CartItem } from 'src/app/core/interfaces/cart-item';
import { CartService } from 'src/app/core/services/cart.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RouterModule } from '@angular/router';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-modal-cart',
  standalone: true,
  imports: [CommonModule, CartInnerComponent, RouterModule],
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  items: CartItem[] = this.cartService.cartItems

  totalPrice = '';

  @Output() closeCartEvent = new EventEmitter();

ngOnInit(): void {
  this.cartService.totalPrice.pipe(untilDestroyed(this)).subscribe(price => this.totalPrice = price.toFixed(2))
}

  closeCart(): void {
    this.closeCartEvent.emit();
  }
}
