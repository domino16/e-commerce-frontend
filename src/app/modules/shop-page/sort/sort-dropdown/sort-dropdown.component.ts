import { Component, ChangeDetectionStrategy, OnInit, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss'],
})
export class SortDropdownComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly el = inject(ElementRef);

  sortForm = new FormGroup({
    sort: new FormControl(),
  });

  ngOnInit(): void {
    this.loadCurrentSettings();
    this.sortForm.valueChanges.pipe(untilDestroyed(this)).subscribe(() => this.sort());
  }

  loadCurrentSettings() {
    let currentSort = this.route.snapshot.queryParamMap.get('sort');
    currentSort ? currentSort : (currentSort = '');
    this.sortForm.get('sort')?.patchValue(currentSort);
  }

  sort() {
    const queryParams: { sort: string, page: undefined } | undefined = {
      sort: this.sortForm.value.sort,
      page: undefined
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams.sort === '' ? { sort: undefined, page: undefined } : queryParams,
    
      queryParamsHandling: 'merge',
    });
   
  }
}
