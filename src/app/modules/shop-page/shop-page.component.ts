import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ProductService } from 'src/app/core/http/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { Observable, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { filterActions } from './filter/+state/filter.actions';
import { selectIsFilterMenuOpen } from './filter/+state/filter.selectors';
import { filterMenuAnimationStateTrigger } from 'src/app/animations/filter-menu-animations';
import { SortComponent } from './sort/sort.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { Page } from 'src/app/core/interfaces/page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, FilterComponent, SortComponent, RouterModule, PaginationComponent],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  animations: [filterMenuAnimationStateTrigger],
})
export class ShopPageComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);
  private readonly productService = inject(ProductService);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  page!: Page;
  
  isFilterMenuOpen = this.store.select(selectIsFilterMenuOpen);

  products$: Observable<Product[]> = this.route.queryParamMap.pipe(
    switchMap(paramMap => {
      return this.productService.getAllProdcts(paramMap).pipe(
        map(response => {
          this.page = response.page;
          return response._embedded.products;
        }),
      );
    }),
  );

  ngOnInit(): void {
    this.scrollTop()
  }

  openFilterMenu() {
    this.store.dispatch(filterActions.toggleFilterMenuOpen({ isMenuOpen: true }));
    this.layoutService.addOverflowHidden();
  }
  
  scrollTop(){
    window.scrollTo({top:0})
  }

}
