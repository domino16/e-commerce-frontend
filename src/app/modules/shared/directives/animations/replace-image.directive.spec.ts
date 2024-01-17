/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable @angular-eslint/use-component-selector */
import { Component, DebugElement } from '@angular/core';
import { ReplaceImageDirective } from './replace-image.directive';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  standalone:true,
  template: `
    <img appReplaceImage [imageUrl]="initialImage" [secondImageUrl]="secondImage" />
  `,
  imports:[ReplaceImageDirective]
})
class TestComponent {
  initialImage = 'initial.jpg';
  secondImage = 'second.jpg';
}

describe('ReplaceImageDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, ReplaceImageDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(ReplaceImageDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(ReplaceImageDirective);
    expect(directive).toBeTruthy();
  });

  it('should change image on mouseover', fakeAsync(() => {
    const imgElement = directiveElement.nativeElement as HTMLImageElement;
    const directive = directiveElement.injector.get(ReplaceImageDirective);

    jest.spyOn(directive, 'changeImageOnMouseover');

    imgElement.dispatchEvent(new Event('mouseover'));
    tick(250);
    fixture.detectChanges();

    expect(directive.changeImageOnMouseover).toHaveBeenCalled();
       expect(imgElement.getAttribute('src')).toBe(component.secondImage);
      
   
  }));

  it('should change image on mouseout', fakeAsync(() => {
    const imgElement = directiveElement.nativeElement;
    const directive = directiveElement.injector.get(ReplaceImageDirective);

    jest.spyOn(directive, 'changeImageOnMouseOut');

    imgElement.dispatchEvent(new Event('mouseout'));
    tick(250);
    fixture.detectChanges();

    expect(directive.changeImageOnMouseOut).toHaveBeenCalled();
    expect(imgElement.getAttribute('src')).toBe(component.initialImage);
  }));
});