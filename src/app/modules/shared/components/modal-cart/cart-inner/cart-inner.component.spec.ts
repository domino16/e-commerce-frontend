import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInnerComponent } from './cart-inner.component';
import { CartItem } from '../../../../../core/interfaces/cart-item';
import { CartService } from '../../../../../core/services/cart.service';

describe('CartInnerComponent', () => {
  let component: CartInnerComponent;
  let fixture: ComponentFixture<CartInnerComponent>;
  let cartService:CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartInnerComponent],
      providers: [ {provide:CartService, useValue: {incrementQuantity: jest.fn(), decrementQuantity: jest.fn(), remove: jest.fn()}}]
    });
    fixture = TestBed.createComponent(CartInnerComponent);
    component = fixture.componentInstance; 
    cartService = TestBed.inject(CartService)
    //data from input
    component.item = {
      imageUrl: 'url/to/image',
      quantity: 5,
      name: 'item 5',
      unitPrice: 24.99,
    } as CartItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#incrementQuantity',()=>{
    const incrementQuantitySpy = jest.spyOn(cartService, 'incrementQuantity')
    component.incrementQuantity();
    expect(incrementQuantitySpy).toHaveBeenCalledTimes(1);
  })

  it('#decrementQuantity',()=>{
    const decrementQuantitySpy = jest.spyOn(cartService, 'decrementQuantity')
    component.decrementQuantity();
    expect(decrementQuantitySpy).toHaveBeenCalledTimes(1);
  })

  it('#removeItem',()=>{
    const removeQuantitySpy = jest.spyOn(cartService, 'remove')
    component.removeItem();
    expect(removeQuantitySpy).toHaveBeenCalledTimes(1);
  })
});
