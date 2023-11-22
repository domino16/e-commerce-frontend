import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortMobileComponent } from './sort-mobile/sort-mobile.component';
import { SortDropdownComponent } from './sort-dropdown/sort-dropdown.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule, SortMobileComponent, SortDropdownComponent],
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {}
