import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalMenuAnimationDirective } from '../../directives/animations/gsap/modal-menu/modal-menu-animation.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-modal-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalMenuAnimationDirective],
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent {
}
