import { Component, ChangeDetectionStrategy, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from 'src/app/core/services/layout.service';



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-modal-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss'],
  animations:[]
})
export class ModalMenuComponent{
  private readonly layoutService = inject(LayoutService)


  isMobile$ = this.layoutService.isMobile$

  openCart(){
    this.layoutService.openCart()
  }

  closeMenu(){
    this.layoutService.closeMenu()
  }
  
}
