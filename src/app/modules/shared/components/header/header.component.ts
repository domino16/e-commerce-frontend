import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BurgerBtnComponent } from './burger-btn/burger-btn.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, BurgerBtnComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
}
