/* eslint-disable max-lines-per-function */
/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable @angular-eslint/use-component-selector */
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StickyReactiveHeaderDirective } from './sticky-reactive-header.directive';

@Component({
  standalone: true,
  template: ` <div appStickyReactiveHeader></div> `,
  imports: [StickyReactiveHeaderDirective],
})
class TestComponent {}

describe('ReplaceImageDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, StickyReactiveHeaderDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.debugElement.query(By.directive(StickyReactiveHeaderDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(StickyReactiveHeaderDirective);
    expect(directive).toBeTruthy();
  });

  it('#onWindowScroll should change image on mouseover', () => {
    const directive = directiveElement.injector.get(StickyReactiveHeaderDirective);
    const onWindowScrollSpy = jest.spyOn(directive, 'onWindowScroll');
    const divElement = directiveElement.nativeElement as HTMLDivElement;

    directive.onWindowScroll();
    expect(onWindowScrollSpy).toHaveBeenCalled();
    // expect(divElement.classList.contains('visible')).toBeTruthy();

    window = Object.assign(window, { scrollY: 100 });
    directive.onWindowScroll();
    expect(divElement.classList.contains('visible')).toBeFalsy();

    
    window = Object.assign(window, { scrollY: 90 });
    directive.onWindowScroll();
    expect(divElement.classList.contains('visible')).toBeTruthy();

    window = Object.assign(window, { scrollY: 90 });
    directive.onWindowScroll();
    expect(divElement.classList.contains('visible')).toBeFalsy();


    window = Object.assign(window, { scrollY: 89 });
    directive.onWindowScroll();
    window = Object.assign(window, { scrollY: 60 });
    directive.onWindowScroll();
    expect(divElement.classList.contains('visible')).toBeFalsy();
  });

});
