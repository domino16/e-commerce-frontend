import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appHeroAnimationOnScroll]',
  standalone: true
})
export class HeroAnimationOnScrollDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger)
   }

ngAfterViewInit(): void {
const el = this.el.nativeElement

  const tl = gsap.timeline({scrollTrigger:{
    trigger: el,
    start: 'top top',
    // endTrigger:'.hasl',
    end: 'bottom top',
    scrub: 1,
    markers: true,
  }})

  tl.to(el, {borderRadius: '0 0 80px 80px', duration:1})
 
}

}
