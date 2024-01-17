/* eslint-disable @angular-eslint/use-component-selector */
/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import { Component, DebugElement} from '@angular/core';
import { HeroAnimationOnScrollDirective } from './hero-animation-on-scroll.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
@Component({
  standalone:true,
  template: `
    <div style="height: 2000px;"></div>
    <div appHeroAnimationOnScroll style="height: 500px;"></div>
    <div style="height: 2000px;"></div>
  `,
})
class TestComponent {}

describe('HeroAnimationOnScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, HeroAnimationOnScrollDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.debugElement.nativeElement.querySelector('[appHeroAnimationOnScroll]');
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should apply animation on scroll', () => {
    window.scrollTo(0, 600);
    setTimeout(() => {
      const element = directiveElement.nativeElement;
      const computedStyles = window.getComputedStyle(element);
      expect(computedStyles.borderRadius).toEqual('0px 0px 80px 80px');
    }, 1500);
  });
});



