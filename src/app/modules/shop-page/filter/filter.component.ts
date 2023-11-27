import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/interfaces/product';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filterActions } from './+state/filter.actions';
import { LayoutService } from 'src/app/core/services/layout.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';

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
  private readonly store = inject(Store);
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  @Output() filteredProductsObservableEmitter = new EventEmitter<Observable<Product[]>>();

  categoryForm = new FormGroup({
    category: new FormControl(),
  });

  ngOnInit(): void {
    this.loadCurrentSettings();
  }

  loadCurrentSettings() {
    const currentCategoryId = this.route.snapshot.queryParamMap.get('id');
    this.categoryForm.get('category')?.patchValue(currentCategoryId);
  }

  closeFilterMenu() {
    this.store.dispatch(filterActions.toggleFilterMenuOpen({ isMenuOpen: false }));
    this.layoutService.removeOverflowHidden();
  }

  filter() {
    const queryParams: { id: string } | undefined = {
      id: this.categoryForm.value.category,
    };
    this.router.navigate([], {relativeTo: this.route,
      queryParams:queryParams.id === '' ? {id:undefined} : queryParams,
    } );
    this.closeFilterMenu();

    
  }
}
