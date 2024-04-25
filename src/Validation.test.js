import validateGroups from './Validation';

describe('validateGroups', () => {
  test('validates that no group is outside the 1-10 range', () => {
    const groups = [{ from: 0, to: 5 }];
    expect(validateGroups(groups)).toContain('Groups should be within the range of 1-10');
  });

  test('detects overlap in groups', () => {
    const groups = [{ from: 1, to: 5 }, { from: 5, to: 10 }];
    expect(validateGroups(groups)).toContain('Overlap detected');
  });

  test('detects gaps between groups', () => {
    const groups = [{ from: 1, to: 4 }, { from: 6, to: 10 }];
    expect(validateGroups(groups)).toContain('Gap detected between group 1 and group 2');
  });
});
