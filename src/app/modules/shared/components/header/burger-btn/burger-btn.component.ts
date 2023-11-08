import { Component, ChangeDetectionStrategy, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Observable, take } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-burger-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burger-btn.component.html',
  styleUrls: ['./burger-btn.component.scss'],
})
export class BurgerBtnComponent {
  private readonly layoutService = inject(LayoutService);
  @Input() isStickyHeader: boolean = false;
  @Input() isMenuTextWhite: boolean = false;
  isMenuOpen$: Observable<boolean> = this.layoutService.isMenuOpen$;

  toggleMenu() {
    // eslint-disable-next-line rxjs-angular/prefer-takeuntil
    this.isMenuOpen$.pipe(take(1)).subscribe(isOpen => {
      isOpen ? this.layoutService.closeMenu() : this.layoutService.openMenu();
    });
  }
}
