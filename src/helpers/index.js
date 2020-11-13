import { COMPLETED, SKIPPED, FAILED, EMPTY, CHECKMARK_VALUES } from 'data/constants';

/**
 * Returns a label for given value of the checkmark.
 * 0 - empty, 1 - completed, 2 - skipped, 3 - failed
 * 
 * @param {Number} value 
 */
export function getCheckmarkLabel(value) {
  switch (value) {
    case COMPLETED:
      return 'completed';
    case SKIPPED:
      return 'skipped';
    case FAILED:
      return 'failed';
    case EMPTY:
      return 'empty';
    default:
      throw new Error(`Unhandled value ${value}`);
  }
}

/**
 * Returns next checkmark value. 
 * 
 * When gets to the last value (failed) it starts over from the first value (empty).
 * 
 * @param {Number} currentValue 
 */
export function getNextCheckmarkValue(currentValue) {
  const values = CHECKMARK_VALUES;

  const nextIndex = (values.indexOf(currentValue) + 1) % values.length;
  const nextValue = values[nextIndex];

  return nextValue;
}

/**
 * Returns next checkmark label. 
 * 
 * @param {Number} currentValue 
 */
export function getNextCheckmarkLabel(currentValue) {
  return getCheckmarkLabel(getNextCheckmarkValue(currentValue));
}