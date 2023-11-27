import { createActionGroup,  props } from '@ngrx/store';

export const filterActions = createActionGroup({
  source: 'Filter',
  events: {
    toggleFilterMenuOpen: props<{ isMenuOpen: boolean }>(),
  },
});
