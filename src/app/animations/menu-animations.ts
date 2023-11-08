// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/no-duplicate-string */
import {
  animate,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const background = '.background';
const nav = '.nav-inner-desktop';
const navMobile = '.nav-inner-mobile';
const sticky = '.sticky';

const ease = 'cubic-bezier(.38,.005,.215,1)';
const duration = '600ms';

const timing = duration + ' ' + ease;
const timingDelay = duration + ' ' + '200ms' + ' ' + ease;

export const menuAnimationStateTrigger = trigger('openCloseMenu', [
  transition(':enter', [
    //hide elements ########################################################################
    //TODO: animate height on mobile screen
    query(nav, style({ width: 0 }), { optional: true }), //left side menu
    query(navMobile, style({ height: 0 }), { optional: true }), //left side menu
    query(
      sticky,
      query(
        'img',
        style({ width: 0, borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }),
      ),
    ), //background image in modal menu media > 1024px
    query(sticky, query('.box', style({ transform: 'translateY(100%)' }))), // right side box in modal menu
    query(sticky, query('.box', query('a', style({ transform: 'translateY(100px)' })))), // button in right side box in modal menu
    query(background, style({ opacity: 0 })), //background in modal menu visabile only during animation
    query('.nav-main', query('li', style({ transform: 'translateX(-120px)' }))), //animate modal menu navlinks
    query('.nav-second', query('li', style({ transform: 'translateY(50px)' }))), //animate modal menu navlinks

    //animate incoming elements ################################################################

    group([
      query(nav, animate(timing, style({ width: '100%' })), { optional: true }), //left side menu
      query(navMobile, animate(timing, style({ height: '100%' })), { optional: true }), //left side menu
      query(
        sticky,
        query(
          'img',
          animate(
            timing,
            style({ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
          ),
        ),
      ), //background image in modal menu media > 1024px
      query(sticky, query('.box', animate(timing, style({ transform: 'translateY(0)' })))), // right side box in modal menu
      query(
        sticky,
        query('.box', query('a', animate(timingDelay, style({ transform: 'translateY(0)' })))),
      ), // button in right side box in modal menu
      query(background, animate(timing, style({ opacity: '1' }))), //background in modal menu visabile only during animation
      query(
        '.nav-main',
        query('li', stagger(20, animate(timing, style({ transform: 'translateX(0px)' })))),
      ),
      query(
        '.nav-second',
        query('li', stagger(40, animate(timing, style({ transform: 'translateY(0px)' })))),
      ),
    ]),
  ]),

  // animate leave elements###############################################################

  transition(':leave', [
    group([
      query(nav, animate(timing, style({ width: 0 })), { optional: true }), //left side menu
      query(navMobile, animate(timing, style({ height: 0 })), { optional: true }), //left side menu
      query(
        sticky,
        query(
          'img',
          animate(
            timing,
            style({ width: 0, borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }),
          ),
        ),
      ), //background image in modal menu media > 1024px
      query(sticky, query('.box', animate(timing, style({ transform: 'translateY(100%)' })))), // right side box in modal menu
      query(
        sticky,
        query('.box', query('a', animate(timing, style({ transform: 'translateY(100px)' })))),
      ), // button in right side box in modal menu
      query(background, animate(timing, style({ opacity: 0 }))), //background in modal menu visabile only during animation
      query(
        '.nav-main',
        query('li', stagger(20, animate(timing, style({ transform: 'translateX(-120px)' })))),
      ),
      query('.nav-second', query('li', animate(timing, style({ transform: 'translateY(50px)' })))),
    ]),
  ]),
]);

// export const onOpenMenuCloseHeaderAnimationTrigger = trigger('onOpenMenuCloseHeaderAnimation', [
  // state('true', style({ transform: 'translateY(-100%)' })),
  // state('false', style({ transform: 'translateY(0)' })),
  // transition('true => false', [animate(timing, style({ transform: 'translateY(0)' }))]),
  // transition('false => true', [animate(timing, style({ transform: 'translateY(-100%)' }))]),
// ]);
export const onOpenMenuOpenStickyHeaderAnimationTrigger = trigger(
  'onOpenMenuOpenStickyHeaderAnimation',
  [state('true', style({ transform: 'translateY(0)', backgroundColor: 'transparent' }))],
);

export const onMenuOpenAnimateHeaderBackgroundTrigger = trigger(
  'onMenuOpenAnimateHeaderBackground',
  [
    state('true', style({ height: 0 })),
    state('false', style({ height: '100%' })),
    transition('true => false', [
      style({ height: '0' }),
      animate(timing, style({ height: '100%' })),
    ]),
    transition('false => true', [
      style({ height: '100%' }),
      animate('300ms cubic-bezier(.38,.005,.215,1)', style({ height: '0' })),
    ]),
  ],
);

export const onMenuOpenAnimateNavLinksTrigger = trigger('onMenuOpenAnimateNavLinks', [
  transition('false => true', [
    query('li', style({ transform: 'translateY(0)' })),
    query(
      'li',
      stagger(
        50,
        animate('450ms cubic-bezier(.38,.005,.215,1)', style({ transform: 'translateY(-100px)' })),
      ),
    ),
  ]),
  transition('true => false', [
    query('li', style({ transform: 'translateY(-100px)' })),
    query(
      'li',
      stagger(
        50,
        animate('450ms cubic-bezier(.38,.005,.215,1)', style({ transform: 'translateY(0)' })),
      ),
    ),
  ]),
]);
