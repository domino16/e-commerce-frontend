import { createFeature, createReducer, on } from '@ngrx/store';
import { filterActions } from './filter.actions';

export const filterFeatureKey = 'filter';

export interface FilterState {
  isFilterMenuOpen: boolean;
}

export const initialState: FilterState = {
  isFilterMenuOpen:false,
};

export const filterReducer = createReducer(
  initialState,
  on(filterActions.toggleFilterMenuOpen, (state, action): FilterState => ({...state, isFilterMenuOpen: action.isMenuOpen})),
);

export const filterFeature = createFeature({
  name: filterFeatureKey,
  reducer:filterReducer,
});

