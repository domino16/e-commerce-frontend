import { Component, ChangeDetectionStrategy, inject,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/http/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/interfaces/cart-item';
import { accordionDivAnimationTrigger, productImageAnimationTrigger, productPageBodyAnimationTrigger } from 'src/app/animations/product-detail-animations';
import { LayoutService } from 'src/app/core/services/layout.service';
import { CategoryTilesComponent } from './category-tiles/category-tiles.component';
import { ImgScrollTriggerDirective } from '../shared/directives/animations/gsap/product-detail-page/img-scroll-trigger.directive';
import { PerksAnimationOnViewportEnterDirective } from '../shared/directives/animations/gsap/product-detail-page/perks-animation-on-viewport-enter.directive';
import { ReplaceImageDirective } from '../shared/directives/animations/replace-image.directive';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CategoryTilesComponent, ImgScrollTriggerDirective, PerksAnimationOnViewportEnterDirective, ReplaceImageDirective],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [accordionDivAnimationTrigger, productImageAnimationTrigger, productPageBodyAnimationTrigger],
})
export class ProductDetailComponent implements AfterViewInit {
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly layoutService = inject(LayoutService);

  product$ = this.productService.getProduct(+this.route.snapshot.paramMap.get('id')!);

  ngAfterViewInit(): void {
this.scrollTop();
  }

  scrollTop() {
    window.scrollTo({ top: 0 });
  }
  
  addToCart(id: string, name: string, imageUrl: string, unitPrice: number, quantity: number): void {
    const item: CartItem = { id, name, imageUrl, unitPrice, quantity };
    this.cartService.addToCart(item);
    this.layoutService.openCart();
  }

  toggleAccordion(el: HTMLDivElement) {
    el.classList.toggle('expanded');
  }
}
