import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from 'src/app/core/interfaces/cart-item';
import { CartService } from 'src/app/core/services/cart.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-cart-inner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-inner.component.html',
  styleUrls: ['./cart-inner.component.scss']
})
export class CartInnerComponent{
  private readonly cartService = inject(CartService)
  
@Input() item!: CartItem 
  totalPrice!: string;



incrementQuantity(){
this.cartService.incrementQuantity(this.item)
}

decrementQuantity(){
this.cartService.decrementQuantity(this.item)
}

removeItem(){
  this.cartService.remove(this.item)
}
}
