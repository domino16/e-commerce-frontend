/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable @angular-eslint/use-component-selector */
import { Component, DebugElement } from "@angular/core";
import { SlideUpDirective } from "./slide-up.directive";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
    standalone:true,
    template: `
      <div appSlideUp ><div></div><div></div></div>
    `,
    imports:[SlideUpDirective]
  })
  class TestComponent {}
  
  describe('SlideUpDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directiveElement: DebugElement;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestComponent, SlideUpDirective],
      });
   
      fixture = TestBed.createComponent(TestComponent);
      directiveElement = fixture.debugElement.query(By.directive(SlideUpDirective));
      fixture.detectChanges();
    });
  
    it('should create an instance', () => {
      const directive = directiveElement.injector.get(SlideUpDirective);
      expect(directive).toBeTruthy();
    });

    it('should kill animate timeline after setTimeout', fakeAsync(() => {
        const directive = directiveElement.injector.get(SlideUpDirective);
        const windowSpy = jest.spyOn(window, 'setTimeout')
        directive.ngAfterViewInit();
        fixture.detectChanges();
        tick(1200);
        expect(windowSpy).toHaveBeenCalled();
      }));
  
  });