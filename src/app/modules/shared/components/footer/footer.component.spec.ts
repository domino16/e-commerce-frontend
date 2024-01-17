import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '../../../../core/services/layout.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let layoutServiceStub: Partial<LayoutService>;


  beforeEach(() => {
layoutServiceStub = {
    openCart:jest.fn(),
  };

    TestBed.configureTestingModule({
      imports: [FooterComponent, RouterTestingModule],
      providers: [{ provide: LayoutService, useValue:layoutServiceStub}]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#sendEmail should set email control as touched ', ()=> {
    component.sendEmail()
    expect(component.emailControl.touched).toBeTruthy();
  })

  it('#sendEmail should set isSubscribe to true ', ()=> {
    component.emailControl.setValue('test@example.com')
    
    component.sendEmail()
    expect(component.isSubscribe).toBeTruthy();
  })

  it('#openCart should open cart', ()=>{
  const layoutServiceSpy = jest.spyOn(layoutServiceStub, 'openCart')
  component.openCart();
  expect(layoutServiceSpy).toHaveBeenCalledTimes(1);
  })

});
