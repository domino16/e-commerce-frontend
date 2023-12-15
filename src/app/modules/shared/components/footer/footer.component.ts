import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private readonly layoutService = inject(LayoutService)
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  isSubscribe = false;

  sendEmail() {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

 this.isSubscribe = true
  }

  openCart(){
    this.layoutService.openCart()
  }
}
