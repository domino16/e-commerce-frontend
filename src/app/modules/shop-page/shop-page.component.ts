import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ProductService } from 'src/app/core/http/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { Observable, noop } from 'rxjs';
import { Store } from '@ngrx/store';
import { filterActions } from './filter/+state/filter.actions';
import { selectIsFilterMenuOpen } from './filter/+state/filter.selectors';
import { filterMenuAnimationStateTrigger } from 'src/app/animations/filter-menu-animations';
import { SortComponent } from './sort/sort.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, FilterComponent, SortComponent],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  animations:[filterMenuAnimationStateTrigger]
})
export class ShopPageComponent implements OnInit {
  private readonly layoutService = inject(LayoutService)
  private readonly productService = inject(ProductService)
  private readonly  store = inject(Store)

  isFilterMenuOpen = this.store.select(selectIsFilterMenuOpen);
  products$: Observable<Product[]> = this.productService.getAllProductList(0,20);  

  ngOnInit(): void {
    noop
  }

  filterProduct(filteredProducts$:Observable<Product[]>){
this.products$ = filteredProducts$
  }

  openFilterMenu(){
    this.store.dispatch(filterActions.toggleFilterMenuOpen({isMenuOpen: true}))
    this.layoutService.addOverflowHidden()
  }





}
