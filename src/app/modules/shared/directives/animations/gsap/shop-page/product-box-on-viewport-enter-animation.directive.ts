import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appProductBoxOnViewportEnterAnimation]',
  standalone: true
})
export class ProductBoxOnViewportEnterAnimationDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger)
   }

ngAfterViewInit(): void {
const el = this.el.nativeElement

  const tl = gsap.timeline({scrollTrigger:{
    trigger: el,
    start: "50 bottom",
  }})

  tl.from(el, {opacity:0 , y: '10%', duration:.5, ease:'cubic-bezier(.38,.005,.215,1)'})
 
}

}