import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap/dist/gsap';
@Directive({
  selector: '[appScrollArrowAnimation]',
  standalone: true,
})
export class ScrollArrowAnimationDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
   gsap.timeline().to(this.el.nativeElement,{y: -10 ,duration:.5 ,ease: 'power3.inOut', yoyo:true, repeat:-1 });
  
  }
}
