import { Directive, ElementRef} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective {
  // private delay: string = '';

  // @HostListener('window:scroll', [])
  // scroll(): void {
  //   const rect = this.el.nativeElement.getBoundingClientRect();
  //   let scroll = this.mapRange(0, window.innerHeight, 0, 1, rect.top + rect.height / 2);
  //   scroll = scroll < 0 ? 0 : scroll > 1 ? 1 : scroll;
  //   this.delay = `-${(scroll).toFixed(100)}s`;
  // }

  // @HostBinding('style.animationDelay') get animationDelay(): string {
  //   return this.delay;
  // }



  // // eslint-disable-next-line max-params
  // private mapRange(a1: number, a2: number, b1: number, b2: number, value: number): number {
  //   return b1 + ((value - a1) * (b2 - b1)) / (a2 - a1);
  // }

  showDemo(){
    const w = this.el.nativeElement
    const section = this.el.nativeElement.parentElement
    const [x, xEnd] =  ['100%', (w.scrollWidth - 0) * -1];
    gsap.fromTo(w, {  x  }, {
      x: xEnd,
      scrollTrigger: { 
        trigger: section, 
        scrub: 0.5 
  }
  })
  }

  constructor(private el: ElementRef, ) {
    gsap.registerPlugin(ScrollTrigger);
    this.showDemo()
  }
}
