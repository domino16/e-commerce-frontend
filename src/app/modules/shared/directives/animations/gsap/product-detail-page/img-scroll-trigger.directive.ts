import { AfterViewInit, Directive } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appImgScrollTrigger]',
  standalone: true,
})
export class ImgScrollTriggerDirective implements AfterViewInit {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    gsap.matchMedia().add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-trigger-parent',
          start: 'top top',
          endTrigger:'.end-trigger',
          end: 'top bottom',
          scrub: 1,
          pin: true,
          markers: true,
        },
      });
      tl.to('.scroll-trigger-child', { height: 'calc(100% - 20px)', duration: 0.15 });
    });
  }
}
