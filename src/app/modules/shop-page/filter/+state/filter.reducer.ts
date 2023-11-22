import { createFeature, createReducer, on } from '@ngrx/store';
import { filterActions } from './filter.actions';

export const filterFeatureKey = 'filter';

export interface FilterState {
  isFilterMenuOpen: boolean;
  categoryId: string;
  sortType: string;

}

export const initialState: FilterState = {
  isFilterMenuOpen:false,
  categoryId: '',
  sortType: '',
};

export const filterReducer = createReducer(
  initialState,
  on(filterActions.toggleFilterMenuOpen, (state, action): FilterState => ({...state, isFilterMenuOpen: action.isMenuOpen})),
  on(filterActions.setCategoryId, (state, action): FilterState => ({...state, categoryId: action.categoryId})),
  on(filterActions.setSortType, (state, action): FilterState =>({...state, sortType: action.sortType}))
);

export const filterFeature = createFeature({
  name: filterFeatureKey,
  reducer:filterReducer,
});

