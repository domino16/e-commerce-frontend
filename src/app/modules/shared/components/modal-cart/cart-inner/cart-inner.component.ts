import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-cart-inner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-inner.component.html',
  styleUrls: ['./cart-inner.component.scss']
})
export class CartInnerComponent {

}
