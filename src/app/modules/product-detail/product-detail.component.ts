import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/http/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/interfaces/cart-item';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
private readonly cartService = inject(CartService)
private readonly productService = inject(ProductService)
private readonly route = inject(ActivatedRoute)

product$ = this.productService.getProduct(+this.route.snapshot.paramMap.get('id')!)

ngOnInit(): void {
  this.scrollTop()
  
}

scrollTop(){
  window.scrollTo({top:0})
}

// eslint-disable-next-line max-params
addToCart(id:string, name:string, imageUrl:string,unitPrice:number, quantity:number): void{
  const item:CartItem = {id, name, imageUrl, unitPrice, quantity}
  this.cartService.addToCart(item)
}

}
