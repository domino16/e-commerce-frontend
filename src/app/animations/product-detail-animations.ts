import { animate, state, style, transition, trigger } from "@angular/animations";


export const accordionDivAnimationTrigger = trigger('expandCollapse', [
    state(
      'collapsed',
      style({
        height: '70px',
        overflow: 'hidden',
      })
    ),
    state(
      'expanded',
      style({
        height: '*',
        overflow: 'hidden',
      })
    ),
    transition('collapsed <=> expanded', [animate('200ms ease-out')])
  ])


  export const tileCarouselAnimationTrigger = trigger('tileCarouselAnimation', [
    state(
      '1',
      style({
        transform: 'translateX(0)'
      })
    ),
    state(
      '2',
      style({
        transform: 'translateX(-16.66666%)'
      })
    ),
    state(
        '3',
        style({
          transform: 'translateX(-33.33333%)'
        })
      ),
      state(
        '4',
        style({
            transform: 'translateX(-50%)'
        })
      ),
      state(
        '5',
        style({
            transform: 'translateX(-66.66666%)'
        })
      ),
      state(
        '6',
        style({
          transform: 'translateX(-83.33333%)'
        })
      ),
    transition('* <=> *', [animate('400ms ease-out')])
  ])
