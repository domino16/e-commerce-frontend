import { animate, group, query, style, transition, trigger } from "@angular/animations"

const background = '.background'
const filterMenu = '.filter-menu'
const sortMenu= '.sort-menu'

const ease = 'cubic-bezier(.38,.005,.215,1)'
const duration = '700ms'

const timing = duration + ' ' + ease

export const filterMenuAnimationStateTrigger = trigger('openCloseFilterMenuAnimation', [
  transition(':enter', [
    //hide elements
    query(
      filterMenu,
      style({
        transform: 'translateX(-100%)',
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
        filterMenu,
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
    query(filterMenu, animate(timing, style({ transform: 'translateX(-100%)'}))),
    query(background, animate(timing, style({ opacity:0})))
  ])
  ]),
]);


export const sortMenuMobileAnimationStateTrigger = trigger('openCloseSortMobileMenuAnimation', [
    transition(':enter', [
      //hide elements
      query(
        sortMenu,
        style({
          transform: 'translateY(100%)',
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
          sortMenu,
        animate(
          timing,
          style({
            transform: 'translateY(0)',
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
      query(sortMenu, animate(timing, style({ transform: 'translateY(100%)'}))),
      query(background, animate(timing, style({ opacity:0})))
    ])
    ]),
  ]);
  