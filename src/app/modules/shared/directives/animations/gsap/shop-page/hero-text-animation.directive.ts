import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
@Directive({
  selector: '[appHeroTextAnimation]',
  standalone: true,
})
export class heroTextAnimationDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer : Renderer2) {
    gsap.registerPlugin(TextPlugin)
  }
  _sentenceEndExp = /([!.?])$/g

  ngAfterViewInit(): void {
    const text = 'Awaken Your Senses with Every Sip.'
    const words = text.split(" ");
    const wordCount = words.length;
    let time:number = 0,word:string, element:HTMLHeadingElement, duration:number, isSentenceEnd:boolean, i:number;
    const tl = gsap.timeline()

    for(i = 0; i < wordCount; i++){
        word = words[+i];
        isSentenceEnd = this._sentenceEndExp.test(word);
        const h3 = this.renderer.createElement('h3');
        const wordElement = this.renderer.createText(word);
        this.renderer.appendChild(h3, wordElement);
        this.renderer.appendChild(this.el.nativeElement, h3);   
        element = this.el.nativeElement.children[+i]
        duration = Math.max(0.5, word.length * 0.08); //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
        if (isSentenceEnd) {
          duration += 0.6; 
        }
        gsap.set(element, {autoAlpha:0, scale:0, z:0.01})

    tl.to(element,{scale:1.2,  ease:"slow(0.25, 0.9)", duration, zIndex:1}, time).to(element, {autoAlpha:1, ease:"slow(0.25, 0.9, true)", duration}, time).to(element, {opacity:0, duration:0.1});
   time += duration;
   if (isSentenceEnd) {
   tl.to(element, {opacity:1, duration:0})

   }
} 
}
}