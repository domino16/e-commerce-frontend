import { createActionGroup,  props } from '@ngrx/store';

export const filterActions = createActionGroup({
  source: 'Filter',
  events: {
    toggleFilterMenuOpen: props<{ isMenuOpen: boolean }>(),
    setCategoryId: props<{ categoryId: string }>(),
    setSortType: props<{ sortType: string }>()
  },
});
