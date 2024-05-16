import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
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
import { ScrollArrowAnimationDirective } from '../shared/directives/animations/gsap/shop-page/scroll-arrow-animation.directive';
import { HeroAnimationOnScrollDirective } from '../shared/directives/animations/gsap/shop-page/hero-animation-on-scroll.directive';
import { shopPageHeroTextAnimationTrigger } from 'src/app/animations/shop-page.animations';
import { ProductBoxOnViewportEnterAnimationDirective } from '../shared/directives/animations/gsap/shop-page/product-box-on-viewport-enter-animation.directive';
import { ReplaceImageDirective } from '../shared/directives/animations/replace-image.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shop-page',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    SortComponent,
    RouterModule,
    PaginationComponent,
    ScrollArrowAnimationDirective,
    HeroAnimationOnScrollDirective,
    ProductBoxOnViewportEnterAnimationDirective,
    ReplaceImageDirective
  ],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  animations: [filterMenuAnimationStateTrigger, shopPageHeroTextAnimationTrigger],
})
export class ShopPageComponent implements OnInit, AfterViewInit {
  private readonly layoutService = inject(LayoutService);
  private readonly productService = inject(ProductService);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  startLoadingTime = 0;

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

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('ad') productImages!: ElementRef;

  ngOnInit(): void {
    this.scrollTop();
    this.layoutService.loadingStart();
    this.startLoadingTime = Date.now();
  }

  ngAfterViewInit() {
    this.setLoadingSpinnerIfVideoIsNotLoaded();
  }

  openFilterMenu() {
    this.store.dispatch(filterActions.toggleFilterMenuOpen({ isMenuOpen: true }));
    this.layoutService.addOverflowHidden();
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  scrollToProducts() {
    const scrollHeight = window.innerHeight;
    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }

  onVideoLoaded() {
    this.layoutService.loadingStop();
  }

  setLoadingSpinnerIfVideoIsNotLoaded() {
    //if loading takes less than 0.6s, extend it to 0.6s
    const minimumLoadTime = 600;
    const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
    videoElement.addEventListener('loadedmetadata', () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.startLoadingTime;
      if (elapsedTime >= minimumLoadTime) {
        videoElement.play()
        this.onVideoLoaded();
      } else {
        setTimeout(() => {
          videoElement.play()
          this.onVideoLoaded();
        }, minimumLoadTime - elapsedTime);
      }
    });
  }

  
}
