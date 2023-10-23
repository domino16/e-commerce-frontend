import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartInnerComponent } from './cart-inner/cart-inner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-modal-cart',
  standalone: true,
  imports: [CommonModule, CartInnerComponent],
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent {
  @Output() closeCartEvent = new EventEmitter();

  closeCart(): void {
    this.closeCartEvent.emit();
  }
}
