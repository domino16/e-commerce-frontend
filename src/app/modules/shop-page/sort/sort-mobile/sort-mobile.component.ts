import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { sortMenuMobileAnimationStateTrigger } from 'src/app/animations/filter-menu-animations';

import { LayoutService } from 'src/app/core/services/layout.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';

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
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  isOpen: boolean = false;

  sortForm = new FormGroup({
    sort: new FormControl(),
  });

  ngOnInit(): void { 
    this.loadCurrentSettings()
    this.sortForm.valueChanges.pipe(untilDestroyed(this)).subscribe(()=> this.sort())
   
  }

  loadCurrentSettings() {
    let currentSort = this.route.snapshot.queryParamMap.get('sort');
    currentSort ? currentSort : currentSort = ''
    this.sortForm.get('sort')?.patchValue(currentSort);
  }

  sort() {
    const queryParams: { sort: string, page: undefined } | undefined = {
      sort: this.sortForm.value.sort,
      page: undefined
    };
    this.router.navigate([], {relativeTo: this.route,
      queryParams:queryParams.sort === '' ? {sort:undefined, page: undefined} : queryParams,
      queryParamsHandling: 'merge'
    } );
    this.closeSortMenu();
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
