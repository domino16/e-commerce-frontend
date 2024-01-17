/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';


describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService],
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should open and close menu', () => {
    service.openMenu();
    service.isMenuOpen$.subscribe((isMenuOpen)=> expect(isMenuOpen).toBe(true));

    service.closeMenu();
    service.isMenuOpen$.subscribe((isMenuOpen)=> expect(isMenuOpen).toBe(false));
  });

  it('should open and close cart ', () => {
    service.openCart();
    service.isCartOpen$.subscribe((isCartOpen)=> expect(isCartOpen).toBe(true));

    service.openMenu();
    service.openCart();
    service.isCartOpen$.subscribe((isCartOpen)=> expect(isCartOpen).toBe(true));

    service.closeCart();
    service.isCartOpen$.subscribe((isCartOpen)=> expect(isCartOpen).toBe(false));
  });


  it('should start and stop loading', () => {
    service.loadingStart();
    service.isLoading$.subscribe((isLoading)=> expect(isLoading).toBe(true));

    service.loadingStop();
    service.isLoading$.subscribe((isLoading)=> expect(isLoading).toBe(false));
  });

  it('should set is mobile to true if windows is less then 1024', () => {
  window.innerWidth = 500
  service.checkResize();
  service.isMobile$.subscribe((isMobile)=> expect(isMobile).toBe(true))

  });

  it('should set is mobile to false if windows is greater then 1024', () => {
    window.innerWidth = 500
    service.checkResize();
    service.isMobile$.subscribe((isMobile)=> expect(isMobile).toBe(false))
   });
   
   it('should call checkResize in the constructor', () => {
    jest.spyOn(service, 'checkResize');
  
    const event = new Event('resize')
    window.dispatchEvent(event);

    expect(service.checkResize).toHaveBeenCalled();
  });

});