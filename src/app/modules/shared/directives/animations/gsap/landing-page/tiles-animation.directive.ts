import { AfterViewInit, Directive, ElementRef} from '@angular/core';
import { gsap } from 'gsap/dist/gsap';


@Directive({
  selector: '[appTilesAnimation]',
  standalone: true,
})
export class TilesAnimationDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    const tile = this.el.nativeElement as HTMLDivElement
    const tiles = tile.querySelectorAll('.tile')
    const buttons: HTMLButtonElement[] = []
    const texts: HTMLParagraphElement[] = []
    const images: HTMLImageElement[] = []
    tiles.forEach((element) => {return buttons.push(element.querySelector('button')!);})
    tiles.forEach((element) => {return texts.push(element.querySelector('p')!);})
    tiles.forEach((element) => {return images.push(element.querySelector('img')!);})

    gsap.timeline().fromTo(tiles, { yPercent: 30, scale: 0.3 }, { stagger:0.15, duration: 0.3, yPercent: 0, ease: 'none' });
    gsap.timeline().to(tiles, {stagger:0.15, duration: 1, delay: 0.3, scale: 1, ease: 'power4' });
    gsap.timeline().from(texts, {stagger:0.15,duration: 1,delay: 0.3,yPercent: -250,scale: 1.5,ease: 'power4',});
    gsap.timeline().from(buttons, {stagger:0.15,duration: 1,delay: 0.3, xPercent: 350,scale: 1.5,ease: 'power4',});
    gsap.timeline().to(images, {stagger:0.15,duration: 1, delay:0.3, width: '70%', ease: 'power4'})
  }
}
