/* eslint-disable @angular-eslint/use-component-selector */
/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import { Component, DebugElement } from '@angular/core';
import { PerksAnimationOnViewportEnterDirective } from './perks-animation-on-viewport-enter.directive';
import { ComponentFixture, TestBed}  from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { gsap } from 'gsap/dist/gsap'

@Component({
  standalone: true,
  template: `
  <div></div><div appPerksAnimationOnViewportEnter></div><div></div>`,
    imports:[PerksAnimationOnViewportEnterDirective]
})
class TestComponent {}

describe('PerksAnimationOnViewportEnterDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(() => {
    // Object.defineProperty(window, 'matchMedia', {
    //   writable: true,
    //   value: jest.fn().mockImplementation((query) => ({
    //     matches: false,
    //     media: query,
    //     onchange: null,
    //     addListener: jest.fn(), 
    //     removeListener: jest.fn(), 
    //     addEventListener: jest.fn(),
    //     removeEventListener: jest.fn(),
    //     dispatchEvent: jest.fn(),
    //   })),
    
  // });
//   window.matchMedia = window.matchMedia || function() {
//     return {
//         matches: false,
//         addListener: function() {},
//         removeListener: function() {}
//     };
// };

gsap.matchMedia = jest.fn()
    TestBed.configureTestingModule({
      imports: [TestComponent, PerksAnimationOnViewportEnterDirective]
    });
    fixture = TestBed.createComponent(TestComponent)
    directiveElement = fixture.debugElement.query(By.directive(PerksAnimationOnViewportEnterDirective));
    fixture.detectChanges();
  });

it('should create an instance', () => {
      const directive = directiveElement.injector.get(PerksAnimationOnViewportEnterDirective);
      expect(directive).toBeTruthy();
    });


});
