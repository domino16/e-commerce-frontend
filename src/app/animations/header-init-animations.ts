import { animate, style, transition, trigger} from '@angular/animations';

const ease = 'cubic-bezier(.38,.005,.215,1)';
const duration = '1s 300ms ';

const timing = duration + ' ' + ease;

export const headerInitAnimationTrigger = trigger('headerInitAniamation', [
  transition(':enter', [
    //hide elements
      style({
        transform: 'translateY(-100%)',
      }),
    //animate elements
        animate(
          timing,
          style({
            transform: 'translateY(0)',
          })),
    ]),
  ]);