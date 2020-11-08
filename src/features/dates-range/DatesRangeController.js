import {
  useDatesRangeDispatch,
  useDatesRangeState,
} from './dates-range-context';

import styles from './DatesRange.module.css';

const DatesRangeController = () => {
  const { startDate, endDate } = useDatesRangeState();
  const dispatch = useDatesRangeDispatch();

  const handleNextClick = () => {
    dispatch({ type: 'next' });
  };

  const handlePreviousClick = () => {
    dispatch({ type: 'previous' });
  };

  return (
    <div>
      <button
        className={styles.button}
        aria-label="Previous"
        onClick={handlePreviousClick}
      >
        &larr;
      </button>
      <span className={styles.value}>{startDate.format('D-MMMM')}</span>
      <span className={styles.value}>{endDate.format('D-MMMM')}</span>
      <button
        className={styles.button}
        aria-label="Next"
        onClick={handleNextClick}
      >
        &rarr;
      </button>
    </div>
  );
};

export default DatesRangeController;
