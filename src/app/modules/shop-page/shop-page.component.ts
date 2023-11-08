import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent {
  private readonly layoutService = inject(LayoutService)

  isFilterMenuOpen = false;

  openFilterMenu(){
    this.isFilterMenuOpen = true;
    this.layoutService.addOverflowHidden()
  }

  closeFilterMenu(){
    this.isFilterMenuOpen = false;
    this.layoutService.removeOverflowHidden()
  }

}
