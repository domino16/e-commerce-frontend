import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCartComponent } from './modal-cart.component';
import { CartService } from 'src/app/core/services/cart.service';

describe('ModalCartComponent', () => {
  let component: ModalCartComponent;
  let fixture: ComponentFixture<ModalCartComponent>;
  // let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCartComponent],
      providers: [CartService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCartComponent);
    component = fixture.componentInstance;
    // cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close cart', () => {
    const closeCartSpy = jest.spyOn(component.closeCartEvent, 'emit');

    component.closeCart();

    expect(closeCartSpy).toHaveBeenCalled();
  });

  // it('should subscribe to cartService totalPrice and update totalPrice property', () => {
  //   const price = 50.55;
  //   jest.spyOn(cartService, 'totalPrice').mockReturnValueOnce({ subscribe: jest.fn(() => of(price)) } as any);


  //   expect(component.totalPrice).toEqual('');

  //   fixture.detectChanges();

  //   expect(component.totalPrice).toEqual(price.toFixed(2));
  // });

});
