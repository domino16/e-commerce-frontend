import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-modal-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent {
}
