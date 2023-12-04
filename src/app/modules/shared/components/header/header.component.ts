// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BurgerBtnComponent } from './burger-btn/burger-btn.component';
import { LayoutService } from 'src/app/core/services/layout.service';
import { combineLatest, Observable } from 'rxjs';
import {
  onMenuOpenAnimateHeaderBackgroundTrigger,
  onMenuOpenAnimateNavLinksTrigger,
} from 'src/app/animations/menu-animations';
import { Store } from '@ngrx/store';
import { selectCurrentRoute} from 'src/app/router.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, BurgerBtnComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [onMenuOpenAnimateHeaderBackgroundTrigger, onMenuOpenAnimateNavLinksTrigger],
})
export class HeaderComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);
  private readonly store = inject(Store);

  @Input() isStickyHeader: boolean = false;

  headerTextColor: '#fff' | '#000' = '#000';
  isMenuTextWhite: boolean = false;
  isMobile$: Observable<boolean> = this.layoutService.isMobile$;
  isMenuOpen$: Observable<boolean> = this.layoutService.isMenuOpen$;

  //routes when header text color is white
  whiteRoutes = ['shop'];

  ngOnInit(): void {
    combineLatest([this.isMenuOpen$, this.isMobile$, this.store.select(selectCurrentRoute)])
      .pipe(untilDestroyed(this))
      .subscribe(([isMenuOpen, isMobile, route]) => {
        if (route) {
          this.setHeaderTextColor(route.routeConfig.path, isMobile, isMenuOpen);
        }
      });
  }

  openCart() {
    this.layoutService.openCart();
  }

  setHeaderTextColor(route: string, isMobile: boolean, isMenuOpen: boolean) {
    const hasStringStartingWithWhiteRoutes = this.whiteRoutes.some(str => route === str);

    if (this.isStickyHeader) {
      if (isMenuOpen && !isMobile) {
        this.headerTextColor = '#fff';
        this.isMenuTextWhite = true;
      } else {
        this.headerTextColor = '#000';
        this.isMenuTextWhite = false;
      }
    } else {
      if (hasStringStartingWithWhiteRoutes) {
        this.headerTextColor = '#fff';
        this.isMenuTextWhite = true;
      } else {
        this.headerTextColor = '#000';
        this.isMenuTextWhite = false;
      }
    }
  }
}
