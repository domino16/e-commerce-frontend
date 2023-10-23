import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { noop } from 'rxjs';

@Directive({
  selector: '[appTilesAnimation]',
  standalone: true
})
export class TilesAnimationDirective implements AfterViewInit {

  constructor(private el: ElementRef,
    ) {
  }

 ngAfterViewInit(): void {
      // gsap.timeline().from(this.el.nativeElement.children, {, stagger:0.04, duration:1,  });
      noop
 }


}