import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-burger-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burger-btn.component.html',
  styleUrls: ['./burger-btn.component.scss']
})
export class BurgerBtnComponent {
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
}
