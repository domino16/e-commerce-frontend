import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { sortMenuMobileAnimationStateTrigger } from 'src/app/animations/filter-menu-animations';

import { LayoutService } from 'src/app/core/services/layout.service';
import { Store } from '@ngrx/store';
import { filterActions } from '../../filter/+state/filter.actions';
import { selectSortType } from '../../filter/+state/filter.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sort-mobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sort-mobile.component.html',
  styleUrls: ['./sort-mobile.component.scss'],
  animations: [sortMenuMobileAnimationStateTrigger],
})
export class SortMobileComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);
  private readonly store = inject(Store);
  isOpen: boolean = false;

  sortForm = new FormGroup({
    sort: new FormControl(),
  });

  ngOnInit(): void { 
    this.loadCurrentSettings()
    this.sortForm.valueChanges.pipe(untilDestroyed(this)).subscribe(()=> this.sort())
   
  }

  loadCurrentSettings() {
    this.store
      .select(selectSortType)
      .pipe(untilDestroyed(this), take(1))
      .subscribe(sortId => this.sortForm.get('sort')?.patchValue(sortId));
  }

  sort() {
    this.store.dispatch(filterActions.setSortType({ sortType: this.sortForm.value.sort }));
  }

  openSortMenu() {
    this.isOpen = true;
    this.layoutService.addOverflowHidden();
  }

  closeSortMenu() {
    this.isOpen = false;
    this.layoutService.removeOverflowHidden();
  }
}
