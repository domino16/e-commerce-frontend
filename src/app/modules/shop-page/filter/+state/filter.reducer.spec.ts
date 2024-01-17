import { filterReducer } from './filter.reducer';
import * as filterActions from './filter.actions';

describe('Filter Reducer', () => {
  const initialState = {
    isFilterMenuOpen:false,
  };

  it('powinien poprawnie obsługiwać akcję toggleFilterMenuOpen', () => {
    const action = filterActions.filterActions.toggleFilterMenuOpen({ isMenuOpen: true });
    const state = filterReducer(initialState, action);

    expect(state.isFilterMenuOpen).toEqual(true);
  });
});