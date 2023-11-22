import * as fromFilter from './filter.reducer';
import { selectFilterState } from './filter.selectors';

describe('Filter Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFilterState({
      [fromFilter.filterFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
