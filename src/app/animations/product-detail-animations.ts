import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

const ease = 'cubic-bezier(.38,.005,.215,1)';
const duration = '1000ms';
const timing = duration + ' ' + ease;

export const accordionDivAnimationTrigger = trigger('expandCollapse', [
  state(
    'collapsed',
    style({
      height: '70px',
      overflow: 'hidden',
    }),
  ),
  state(
    'expanded',
    style({
      height: '*',
      overflow: 'hidden',
    }),
  ),
  transition('collapsed <=> expanded', [animate('200ms ease-out')]),
]);

export const tileCarouselAnimationTrigger = trigger('tileCarouselAnimation', [
  state(
    '1',
    style({
      transform: 'translateX(0)',
    }),
  ),
  state(
    '2',
    style({
      transform: 'translateX(-16.66666%)',
    }),
  ),
  state(
    '3',
    style({
      transform: 'translateX(-33.33333%)',
    }),
  ),
  state(
    '4',
    style({
      transform: 'translateX(-50%)',
    }),
  ),
  state(
    '5',
    style({
      transform: 'translateX(-66.66666%)',
    }),
  ),
  state(
    '6',
    style({
      transform: 'translateX(-83.33333%)',
    }),
  ),
  transition('* <=> *', [animate('400ms ease-out')]),
]);

export const productImageAnimationTrigger = trigger('productImageAnimation', [
  transition(':enter', [
    // hide elements and translate first
    style({
      top: '250px',
      transform: 'scale(0.3)',
    }),
    animate(
      '300ms cubic-bezier(.38,.005,.215,1)',
      style({
        top: '120px',
      }),
    ),
    animate(
      '700ms cubic-bezier(.38,.005,.215,1)',
      style({
        transform: 'scale(1)',
      }),
    ),
  ]),
]);

export const productPageBodyAnimationTrigger = trigger('productPageBodyAnimation', [
  transition(':enter', [
    // hide elements and translate first
    group([
      query('.product-name', [
        style({
          opacity: 0,
          transform: 'rotateX(90deg) translateY(-200px)',
        }),
        animate(timing)
      ]),
      query('.price', [
        style({
          opacity:0,
          transform: 'scale(0)',
        }),
        animate(timing),
      ]),
      query('.add-cart-btn', [
        style({
          opacity: 0,
          width:0,
          padding:0
        }),
        animate(timing),
      ]),
      query('.product-description', [
        style({
          opacity:0,
          transform: 'translateX(150px)'
        }),
        animate(timing),
      ]),
    ]),
  ]),
]);
