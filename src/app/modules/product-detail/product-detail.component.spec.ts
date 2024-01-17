import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../core/http/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '../../core/services/layout.service';
import { CartService } from '../../core/services/cart.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockService: Partial<ProductService>;
  let mockProductService: Partial<LayoutService>;

  let cartService: CartService;
  let layoutService: LayoutService;

  beforeEach(async () => {
    mockService = {
      getProduct: jest.fn(),
    };
    mockProductService = {
      openCart: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent, RouterTestingModule],
      providers: [
        {provide: CartService, useValue: {addToCart: jest.fn()}},
        { provide: ProductService, useValue: mockService },
        { provide: LayoutService, useValue: mockProductService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    cartService = TestBed.inject(CartService);
    layoutService = TestBed.inject(LayoutService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addToCart should add product to cart', () => {
    const cartServiceSpy = jest.spyOn(cartService , 'addToCart');
    const layoutServiceSpy = jest.spyOn(layoutService, 'openCart');
    component.addToCart('foo', 'foo', 'foo', 2 ,2)

    expect(cartServiceSpy).toHaveBeenCalled();
    expect(layoutServiceSpy).toHaveBeenCalled();
  });


  it('#toggleAccordion should toggle class at element', () => {
    const accordionElement: HTMLDivElement = document.createElement('div');
    component.toggleAccordion(accordionElement);
    expect(accordionElement.classList.contains('expanded')).toBe(true);

    component.toggleAccordion(accordionElement);
    expect(accordionElement.classList.contains('expanded')).toBe(false);
  });
});
