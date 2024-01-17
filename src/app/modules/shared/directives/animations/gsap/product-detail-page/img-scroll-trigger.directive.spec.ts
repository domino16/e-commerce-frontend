/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable @angular-eslint/use-component-selector */
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgScrollTriggerDirective } from './img-scroll-trigger.directive';
import { By } from '@angular/platform-browser';


@Component({
  standalone: true,
  template: ` <div appImgScrollTrigger></div>`,
  imports: [ImgScrollTriggerDirective],
})
class TestComponent {}

describe('ImgScrollTriggerDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: true,
          addListener: function () {},
          removeListener: function () {},
        };
      };

    TestBed.configureTestingModule({
      imports: [TestComponent, ImgScrollTriggerDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.debugElement.query(By.directive(ImgScrollTriggerDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(ImgScrollTriggerDirective);
    expect(directive).toBeTruthy();
  });
});
