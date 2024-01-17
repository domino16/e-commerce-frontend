/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { CartItem } from '../interfaces/cart-item';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addToCart should add product to cart', () => {
    // Arrange
    const cartItemToAdd: CartItem = {
      id: '1',
      name: 'Test Product',
      quantity: 1,
      unitPrice: 10,
      imageUrl: '',
    };
    const initialCartLength = service.cartItems.length;

    service.addToCart(cartItemToAdd);
    expect(service.cartItems.length).toBe(initialCartLength + 1);
    const addedItem = service.cartItems.find(item => item.id === cartItemToAdd.id);
    expect(addedItem).toBeTruthy();

    if (addedItem) {
      expect(addedItem.quantity).toBe(1);
    }
  });

  it('#addToCart should increment quantity of existing item in cart', () => {
    const cartItem = {
      id: '1',
      name: 'Test Product',
      quantity: 1,
      unitPrice: 10,
      imageUrl: '',
    };
    service.addToCart(cartItem);
    service.addToCart(cartItem);

    expect(service.cartItems.length).toBe(1);
    expect(service.cartItems[0].quantity).toBe(3);
  });

  it('#computeCartTotals', () => {
    const sampleCartItems = [
      { id: '1', name: 'Test Product 1', quantity: 3, unitPrice: 10, imageUrl: '' },
      { id: '2', name: 'Test Product 2', quantity: 2, unitPrice: 150, imageUrl: '' },
      { id: '3', name: 'Test Product 3', quantity: 1, unitPrice: 17, imageUrl: '' },
    ];
    service.cartItems = sampleCartItems;

    service.computeCartTotals();

    const totalPrice = sampleCartItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );
    const totalQuantity = sampleCartItems.reduce((acc, item) => acc + item.quantity, 0);

    expect(service.totalPrice.getValue()).toBe(totalPrice);
    expect(service.totalQuantity.getValue()).toBe(totalQuantity);
  });

  it('#persistCartItems should set cart items to session storage', () => {
    const sampleCartItems = [
      { id: '1', name: 'Test Product 1', quantity: 3, unitPrice: 10, imageUrl: '' },
      { id: '2', name: 'Test Product 2', quantity: 2, unitPrice: 150, imageUrl: '' },
      { id: '3', name: 'Test Product 3', quantity: 1, unitPrice: 17, imageUrl: '' },
    ];
    service.cartItems = sampleCartItems;

    service.persistCartItems();

    const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')!);
    expect(storedCartItems).toEqual(sampleCartItems);
  });

  it('#decrementQuantity should decrement quantity and remove item', () => {
    const cartItemToDecremnt: CartItem = {
      quantity: 1,
    } as CartItem;
    service.addToCart(cartItemToDecremnt);
    const remove = jest.spyOn(service, 'remove');

    service.decrementQuantity(cartItemToDecremnt);

    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('#decrementQuantity should decrement quantiy', () => {
    const cartItemToDecremnt: CartItem = {
      quantity: 2,
    } as CartItem;
    service.addToCart(cartItemToDecremnt);
    service.decrementQuantity(cartItemToDecremnt);

    expect(cartItemToDecremnt.quantity).toBe(1);
  });

  it('#incrementQuantity should increment quantiy', () => {
    const cartItemToIncremnt: CartItem = {
      quantity: 2,
    } as CartItem;
    service.addToCart(cartItemToIncremnt);
    service.incrementQuantity(cartItemToIncremnt);

    expect(cartItemToIncremnt.quantity).toBe(3);
  });

  it('#remove should remove item from cart', () => {
    const cartItemToRemove: CartItem = {
      id: '2',
    } as CartItem;

    service.cartItems = [cartItemToRemove];

    service.remove(cartItemToRemove);

    expect(service.cartItems.length).toBe(0);
  });

  it('#resetCart should reset cart', () => {
    service.cartItems = [{ id: '1' } as CartItem, { id: '2' } as CartItem, { id: '3' } as CartItem];

    service.resetCart();

    expect(service.cartItems.length).toBe(0);
  });
});
