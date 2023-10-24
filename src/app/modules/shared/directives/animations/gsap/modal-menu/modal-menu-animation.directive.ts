import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap'


@Directive({
  selector: '[appModalMenuAnimation]',
  standalone: true
})
export class ModalMenuAnimationDirective implements AfterViewInit {

  constructor(private el:ElementRef) { }

  ngAfterViewInit(): void {
    gsap.timeline().from(this.el.nativeElement, {width:0, duration:10})

  }

}
