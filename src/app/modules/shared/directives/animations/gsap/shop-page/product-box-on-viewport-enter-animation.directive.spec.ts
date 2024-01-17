/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable @angular-eslint/use-component-selector */
import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductBoxOnViewportEnterAnimationDirective } from "./product-box-on-viewport-enter-animation.directive";
import { By } from "@angular/platform-browser";

@Component({
    standalone:true,
    template: `
      <div appProductBoxOnViewportEnterAnimation> </div>
    `,
    imports: [ProductBoxOnViewportEnterAnimationDirective]
  })
  class TestComponent {}
  
  describe('ProductBoxOnViewPortEnterAnimationDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directiveElement: DebugElement;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent, ProductBoxOnViewportEnterAnimationDirective],
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      directiveElement = fixture.debugElement.query(By.directive(ProductBoxOnViewportEnterAnimationDirective));
      fixture.detectChanges();
    });

    it('should create an instance', () => {
        const directive = directiveElement.injector.get(ProductBoxOnViewportEnterAnimationDirective);
        expect(directive).toBeTruthy();
      });
  
  });