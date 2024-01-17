import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ShopPageComponent } from './shop-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutService } from '../../core/services/layout.service';
import { filterActions } from './filter/+state/filter.actions';
import { ProductService } from '../../core/http/product.service';
import { of } from 'rxjs';
import { ActivatedRoute} from '@angular/router';

// eslint-disable-next-line max-lines-per-function
describe('ShopPageComponent', () => {
  let component: ShopPageComponent;
  let fixture: ComponentFixture<ShopPageComponent>;
  let layoutService: LayoutService;
  let productService: ProductService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopPageComponent, HttpClientModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        provideMockStore(),
        {
          provide: LayoutService,
          useValue: {
            loadingStart: jest.fn(),
            loadingStop: jest.fn(),
            addOverflowHidden: jest.fn(),
          },
          
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot:{queryParamMap: {get: jest.fn(()=> {})}},
            queryParamMap: of({}),
          },
        },
        {
          provide: ProductService,
          useValue: {
            getAllProdcts: jest.fn(()=>of({_embedded:{products:[]}}))
          },
          
        },
      ],
    });
    fixture = TestBed.createComponent(ShopPageComponent);
    layoutService = TestBed.inject(LayoutService);
    productService = TestBed.inject(ProductService);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get allProducts after init ', (done)=>{
    const spy = jest.spyOn(productService, 'getAllProdcts')
    component.products$.subscribe(()=>{
      expect(spy).toHaveBeenCalled();
      done()
    })
  })

  it('#openFilterMenu should open menu', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.openFilterMenu();
    expect(dispatchSpy).toHaveBeenCalledWith(
      filterActions.toggleFilterMenuOpen({ isMenuOpen: true }),
    );
  });

  it('#scrollToProducts should scroll top - 100vh', () => {
    const windowSpy = jest.spyOn(window, 'scrollTo');

    component.scrollToProducts();

    expect(windowSpy).toHaveBeenCalled();
  });

  it('#onVideoLoaded should call layoutService.loadingStop()', () => {
    const loadingStopSpy = jest.spyOn(layoutService, 'loadingStop');
    component.onVideoLoaded();
    expect(loadingStopSpy).toHaveBeenCalled();
  });

  it('#setLoadingSpinnerIfVideoIsNotLoadedshould handle video loading with a minimum delay', fakeAsync(() => {
    const minimumLoadTime = 600;

    const videoPlayer = {
      nativeElement: document.createElement('video'),
    };

    component.videoPlayer = videoPlayer;
    component.startLoadingTime = Date.now() - 6000;

    let videoLoaded = false;
    component.onVideoLoaded = () => {
      videoLoaded = true;
    };

    component.setLoadingSpinnerIfVideoIsNotLoaded();

    videoPlayer.nativeElement.dispatchEvent(new Event('loadedmetadata'));

   tick(minimumLoadTime);

    expect(videoLoaded).toBeTruthy();
  }));

  it('#setLoadingSpinnerIfVideoIsNotLoadeds should setTimout if minimumLoadTime < realLoadTime ', fakeAsync(() => {
    const minimumLoadTime = 600;

    const videoPlayer = {
      nativeElement: document.createElement('video'),
    };

    component.videoPlayer = videoPlayer;
    component.startLoadingTime = Date.now()

    let videoLoaded = false;
    component.onVideoLoaded = () => {
      videoLoaded = true;
    };

    component.setLoadingSpinnerIfVideoIsNotLoaded();

    videoPlayer.nativeElement.dispatchEvent(new Event('loadedmetadata'));

   tick(minimumLoadTime);

    expect(videoLoaded).toBeTruthy();
  }));
});
