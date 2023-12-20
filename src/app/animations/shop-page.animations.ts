import { animate, style, transition, trigger } from "@angular/animations";

const ease = 'cubic-bezier(.38,.005,.215,1)';
const duration = '1200ms 600ms ';

const timing = duration + ' ' + ease;

export const shopPageHeroTextAnimationTrigger = trigger('shopPageHeroTextAnimation', [
  transition(':enter', [
    //hide elements
      style({
        opacity: 0,
        transform: 'rotateX(90deg) translateY(50vh)',
      }),
    //animate elements
        animate(timing),
    ]),
  ]);

