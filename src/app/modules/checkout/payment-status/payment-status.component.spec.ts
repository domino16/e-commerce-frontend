import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusComponent } from './payment-status.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('PaymentStatusComponent', () => {
  let component: PaymentStatusComponent;
  let fixture: ComponentFixture<PaymentStatusComponent>;

  const createComponent = async (redirect_status: string, tracking_number: string) => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusComponent, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(
              convertToParamMap(
                { redirect_status: redirect_status, tracking_number: tracking_number }
              ),
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', async () => {
    await createComponent('succeeded', '123');
    expect(component).toBeTruthy();
  });

  it('should set isSuccess to true and tracking number to 123', async () => {
    await createComponent('succeeded', '123'); 
    expect(component.isSuccess).toBeTruthy();
    expect(component.trackingNumber).toEqual('123');
  });

  it('should set isSuccess to false', async () => {
    await createComponent('no succeeded', '');
    expect(component.isSuccess).toBeFalsy();
    expect(component.trackingNumber).toBeFalsy();
  });
});
