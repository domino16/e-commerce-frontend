import { animate, style, transition, trigger, query, group } from '@angular/animations';

const background = '.background'
const cart = '.cart'

const ease = 'cubic-bezier(.38,.005,.215,1)'
const duration = '700ms'

const timing = duration + ' ' + ease

export const cartAnimationStateTrigger = trigger('openCloseCart', [
  transition(':enter', [
    //hide elements
    query(
      cart,
      style({
        transform: 'translateX(100%)',
      }),
    ),
    query(
      background,
      style({
        opacity: 0,
      }),
    ),

    //animate elements
    group([
       query(
        cart,
      animate(
        timing,
        style({
          transform: 'translateX(0)',
        }),
      ),
    ),

    query(
      background,
      animate(
        timing,
        style({
          opacity: '1',
        }),
      ),
    ),
    ])
   
  ]),
  transition(':leave', [
  group([ 
    query(cart, animate(timing, style({ transform: 'translateX(100%)'}))),
    query(background, animate(timing, style({ opacity:0})))
  ])
  ]),
]);
