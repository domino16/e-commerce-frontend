import { Inject, Injectable,PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
 
  private isMenuOpenSubject = new BehaviorSubject<boolean>(false);
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  isMenuOpen$: Observable<boolean> = this.isMenuOpenSubject.asObservable();
  isCartOpen$: Observable<boolean> = this.isCartOpenSubject.asObservable();
  isMobile$: Observable<boolean> = this.isMobileSubject.asObservable(); 
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkResize();
      window.addEventListener('resize', () => this.checkResize());
    }
  }

  openMenu() {
    this.isMenuOpenSubject.next(true);
    this.addOverflowHidden();
  }

  closeMenu() {
    this.isMenuOpenSubject.next(false);
    this.removeOverflowHidden();
  }

  openCart() {
    // if menu is open then close it. add overflow only when menu was closed
    if (this.isMenuOpenSubject.value) {
      this.isMenuOpenSubject.next(false);
    } else {
      this.addOverflowHidden();
    }
    this.isCartOpenSubject.next(true);
  }

  closeCart() {
    this.isCartOpenSubject.next(false);
    this.removeOverflowHidden();
  }

  addOverflowHidden() {
    document.body.style.overflow = 'hidden';
  }

  removeOverflowHidden() {
    document.body.style.overflow = 'visible';
  }

  checkResize() {
    if (window.innerWidth < 1024) {
      this.isMobileSubject.next(true);
    } else {
      this.isMobileSubject.next(false);
    }
  }

  loadingStart(){
this.isLoadingSubject.next(true);
this.addOverflowHidden()
  }

  loadingStop(){
    this.isLoadingSubject.next(false);
    this.removeOverflowHidden()
  }
}
