import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

@Directive({
  selector: '[appPerksAnimationOnViewportEnter]',
  standalone: true
})
export class PerksAnimationOnViewportEnterDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger)
   }

ngAfterViewInit(): void {
const el = this.el.nativeElement.children

  const tl = gsap.timeline({scrollTrigger:{
    trigger: el,
    start: "50 bottom",
  }})

  tl.from(el, {opacity:0 , y: '20%', duration:.7, ease:'cubic-bezier(.38,.005,.215,1)', stagger: 0.1})
 
}
}
