import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInnerComponent } from './cart-inner.component';

describe('CartInnerComponent', () => {
  let component: CartInnerComponent;
  let fixture: ComponentFixture<CartInnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartInnerComponent]
    });
    fixture = TestBed.createComponent(CartInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
