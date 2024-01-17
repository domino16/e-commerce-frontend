import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMenuComponent } from './modal-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '../../../../core/services/layout.service';

describe('ModalMenuComponent', () => {
  let component: ModalMenuComponent;
  let fixture: ComponentFixture<ModalMenuComponent>;
  let layoutService: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalMenuComponent, RouterTestingModule],
      providers: [{provide: LayoutService, useValue: {openCart: jest.fn(), closeMenu: jest.fn()}}]
    });
    fixture = TestBed.createComponent(ModalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    layoutService = TestBed.inject(LayoutService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openCart should openCart', () => {
    const openCartSpy = jest.spyOn(layoutService, 'openCart');

    component.openCart();

    expect(openCartSpy).toHaveBeenCalledTimes(1);
  })

  it('#closeMenu should openCart', () => {
    const closeMenuSpy = jest.spyOn(layoutService, 'closeMenu');

    component.closeMenu();

    expect(closeMenuSpy).toHaveBeenCalledTimes(1);
  })
});
