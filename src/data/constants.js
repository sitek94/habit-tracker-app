export const DATE_FORMAT = 'DD-MM-YYYY';

export const EMPTY = 0;
export const COMPLETED = 1;
export const SKIPPED = 2;
export const FAILED = 3;

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

export const CHECKMARKS = [EMPTY, COMPLETED, SKIPPED, FAILED];
