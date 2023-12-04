import { Component, ChangeDetectionStrategy, inject} from '@angular/core';
import { HeaderComponent } from './modules/shared/components/header/header.component';
import { ModalMenuComponent } from './modules/shared/components/modal-menu/modal-menu.component';
import { CommonModule } from '@angular/common';
import { ModalCartComponent } from './modules/shared/components/modal-cart/modal-cart.component';
import { StickyReactiveHeaderDirective } from './modules/shared/directives/animations/header/sticky-reactive-header.directive';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { cartAnimationStateTrigger } from './animations/cart-animations'
import { menuAnimationStateTrigger, onOpenMenuOpenStickyHeaderAnimationTrigger } from './animations/menu-animations'
import { LayoutService } from './core/services/layout.service';
import { Observable } from 'rxjs';
import { headerInitAnimationTrigger } from './animations/header-init-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, HeaderComponent, ModalMenuComponent, ModalCartComponent, StickyReactiveHeaderDirective, LandingPageComponent, RouterOutlet],
  standalone: true,
  animations: [cartAnimationStateTrigger, menuAnimationStateTrigger, onOpenMenuOpenStickyHeaderAnimationTrigger, headerInitAnimationTrigger ]
})
export class AppComponent{
  private readonly layoutService = inject(LayoutService)

  isMenuOpen$: Observable<boolean> = this.layoutService.isMenuOpen$
  isCartOpen$:  Observable<boolean> = this.layoutService.isCartOpen$

  a = this.layoutService.obj
 

  closeCart(){
    this.layoutService.closeCart();
  }

  

}
