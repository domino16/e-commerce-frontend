import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appSlideUp]',
  standalone: true,
})
export class SlideUpDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const animate = gsap.timeline().from(this.el.nativeElement.children, {
      yPercent: '80',
      stagger: 0.06,
      duration: 4,
      ease: 'elastic.out(1,0.2)',
    });
    gsap.timeline().from(this.el.nativeElement.children, {
      opacity: 0,
      rotationX: 90,
      stagger: 0.06,
      duration: 1,
      ease: 'power1',
    });
    setTimeout(() => {
      animate.kill();
      animate.smoothChildTiming
    }, 1200);
  }
}
