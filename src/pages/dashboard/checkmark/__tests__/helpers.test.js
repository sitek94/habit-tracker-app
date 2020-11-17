import { getCheckmarkLabel, getNextCheckmarkValue } from '../helpers';
import { COMPLETED, FAILED, EMPTY, CHECKMARK_VALUES } from 'data/constants';

// Get checkmark label
describe('getCheckmarkLabel function', () => {
  it(`returns "empty" when called with ${EMPTY}`, () => {
    expect(getCheckmarkLabel(EMPTY)).toBe('empty');
  });

  it(`returns "completed" when called with ${COMPLETED}`, () => {
    expect(getCheckmarkLabel(COMPLETED)).toBe('completed');
  });

  it(`returns "failed" when called with ${FAILED}`, () => {
    expect(getCheckmarkLabel(FAILED)).toBe('failed');
  });
  
  it('throws an error when called with any other value', () => {
    expect(() => getCheckmarkLabel('Chuck Norris')).toThrow();
  });
});

// Get next checkmark value
describe('getNextCheckmarkValue function', () => {
  it(`returns ${COMPLETED} when called with ${EMPTY}`, () => {
    expect(getNextCheckmarkValue(EMPTY)).toBe(COMPLETED);
  });

  it(`returns ${EMPTY} when called with ${FAILED}`, () => {
    expect(getNextCheckmarkValue(FAILED)).toBe(EMPTY);
  }); 

  it(`throws an error when called with value that is not in ${CHECKMARK_VALUES}`, () => {
    expect(() => getNextCheckmarkValue(123)).toThrow();
  });
})