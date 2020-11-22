import { COMPLETED, FAILED, EMPTY, CHECKMARK_VALUES } from 'data/constants';

export function getCheckmarkLabel(value) {
  switch (value) {
    case COMPLETED:
      return 'completed';
    case FAILED:
      return 'failed';
    case EMPTY:
      return 'empty';
    default:
      throw new Error(`Unhandled value ${value}`);
  }
}

export function getNextCheckmarkValue(currentValue) {
  const values = CHECKMARK_VALUES;

  if (!values.includes(currentValue)) {
    throw new Error(`Unhandled value ${currentValue}`);
  }

  const nextIndex = (values.indexOf(currentValue) + 1) % values.length;
  const nextValue = values[nextIndex];

  return nextValue;
}