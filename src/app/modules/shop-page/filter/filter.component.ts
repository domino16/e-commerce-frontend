import { Component, ChangeDetectionStrategy, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/http/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filterActions } from './+state/filter.actions';
import { LayoutService } from 'src/app/core/services/layout.service';
import { selectCategoryId } from './+state/filter.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly store = inject(Store)
  private readonly layoutService = inject(LayoutService)

  @Output() filteredProductsObservableEmitter = new EventEmitter<Observable<Product[]>>();

  categoryForm = new FormGroup({
    category: new FormControl(),
  });

  ngOnInit(): void {
    this.loadCurrentSettings()
  }

   loadCurrentSettings() {
    this.store.select(selectCategoryId).pipe(untilDestroyed(this)).subscribe(categoryId => this.categoryForm.get('category')?.patchValue(categoryId))
  }

  closeFilterMenu() {
    this.store.dispatch(filterActions.toggleFilterMenuOpen({isMenuOpen:false}))
    this.layoutService.removeOverflowHidden()
  }

  filter() {
    this.store.dispatch(filterActions.setCategoryId({categoryId: this.categoryForm.value.category}))
    if (this.categoryForm.value.category) {
      this.filteredProductsObservableEmitter.emit(
        this.productService.getProductListByCategory(this.categoryForm.value.category),
      );
    } else {
      this.filteredProductsObservableEmitter.emit(this.productService.getAllProductList(0,20));
    }
   this.closeFilterMenu()
  }
}
