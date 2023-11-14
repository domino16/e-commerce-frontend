import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ProductService } from 'src/app/core/http/product.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  private readonly layoutService = inject(LayoutService)
  private readonly productService = inject(ProductService)

  isFilterMenuOpen = false;

  ngOnInit(): void {
    this.productService.getAllProductList(1,3).subscribe((productList) => console.log(productList))
  }

  openFilterMenu(){
    this.isFilterMenuOpen = true;
    this.layoutService.addOverflowHidden()
  }

  closeFilterMenu(){
    this.isFilterMenuOpen = false;
    this.layoutService.removeOverflowHidden()
  }



}
