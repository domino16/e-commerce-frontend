import { Component, ChangeDetectionStrategy} from '@angular/core';
import { HeaderComponent } from './modules/shared/components/header/header.component';
import { ModalMenuComponent } from './modules/shared/components/modal-menu/modal-menu.component';
import { CommonModule } from '@angular/common';
import { ModalCartComponent } from './modules/shared/components/modal-cart/modal-cart.component';
import { StickyReactiveHeaderDirective } from './modules/shared/directives/sticky-reactive-header.directive';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { HeaderInitAnimationDirective } from './modules/shared/directives/animations/gsap/header-init-animation.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, HeaderComponent, ModalMenuComponent, ModalCartComponent, StickyReactiveHeaderDirective, LandingPageComponent, HeaderInitAnimationDirective],
  standalone: true,
})
export class AppComponent{
  isMenuOpen: boolean = false;
  isCartOpen: boolean = false;


  onIsMenuChangedStatusChange(value: boolean): void {
    this.isMenuOpen = value;
    value ? this.addOverflowHidden() : this.removeOverflowHidden()
  }

  openCart(){
    this.isMenuOpen = false;
    this.isCartOpen = true;
    this.addOverflowHidden()
  }

  closeCart(){
    this.isCartOpen = false
    this.removeOverflowHidden()
  }

 addOverflowHidden(){
  document.body.style.overflow = 'hidden';
 }

 removeOverflowHidden(){
  document.body.style.overflow = 'visible';
 }

}
