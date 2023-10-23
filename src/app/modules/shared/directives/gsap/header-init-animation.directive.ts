import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appHeaderInitAnimation]',
  standalone: true,
})
export class HeaderInitAnimationDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    gsap
      .timeline()
      .to(this.el.nativeElement, { y: '0', duration: 0.9, delay: 0.3, ease: 'power1.inOut' });
  }
}
