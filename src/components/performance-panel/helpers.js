import { COMPLETED } from 'data/constants';

/**
 * Checkmark object
 * @typedef  Checkmark
 *
 * @property {string} id
 * @property {string} date
 * @property {string} habitId
 * @property {number} value
 */

/**
 * Calculate score
 *
 * Calculates the score for an array of checkmark values.
 * The perfomance is the count of COMPLETED checkmarks divided
 * by the total count.
 *
 * @param  {number[]} values
 *
 * @returns {number}  floored score between 0 and 100
 */
export function calculateScore(values) {
  if (!values.length) return 0;

  const completedCount = values.reduce((sum, value) => {
    return value === COMPLETED ? sum + 1 : sum;
  }, 0);

  return Math.floor((completedCount / values.length) * 100);
}

/**
 * Create pie chart data
 *
 * @returns an array of data for pie chart
 */
export function createPieChartData(values) {
  const score = calculateScore(values);

  return [
    {
      id: 'value',
      value: score,
    },
    {
      id: 'empty',
      value: 100 - score,
    },
  ];
}
