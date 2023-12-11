import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, RouterModule } from '@angular/router';


@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-payment-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit{
  private readonly route = inject(ActivatedRoute)
  
  isSuccess=false;
  trackingNumber: string | null = null
  paymentIntent: string | null | undefined = null
  failureMessage: string | null = 'unexpected error'

  ngOnInit(): void {
    this.route.queryParamMap.pipe(untilDestroyed(this)).subscribe(queryMap => {
      const status = queryMap.get('redirect_status');
      this.trackingNumber = queryMap.get('tracking_number');
      this.failureMessage = queryMap.get('error_message');
      this.paymentIntent = queryMap.get('payment_intent')?.slice(3);
      this.trackingNumber ? this.trackingNumber : this.trackingNumber = this.paymentIntent!


      if (status == 'succeeded') {
        this.isSuccess = true
      } else {
        this.isSuccess = false
      }
    });


  }

}
