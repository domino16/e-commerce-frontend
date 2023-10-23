import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
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
@Output() menuStatus = new EventEmitter<boolean>();

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
    this.menuStatus.emit(this.isMenuOpen);
  }
}
