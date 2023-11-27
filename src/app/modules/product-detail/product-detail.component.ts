import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/http/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{

private readonly productService = inject(ProductService)
private readonly route = inject(ActivatedRoute)

product$ = this.productService.getProduct(+this.route.snapshot.paramMap.get('id')!)

ngOnInit(): void {
  this.scrollTop()
  
}

scrollTop(){
  window.scrollTo({top:0})
}

}
