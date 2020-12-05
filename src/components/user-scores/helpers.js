import { COMPLETED } from 'data/constants';
import { getWeek, isThisWeek, isToday } from 'date-fns';

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
 * Is checkmark today?
 * 
 * Check if the checkmark's date is today
 *
 * @param {Checkmark} checkmark
 * 
 * @returns {boolean} true/false
 */
export function isCheckmarkToday(checkmark) {
  return isToday(new Date(checkmark.date));
}

/**
 * Is checkmark this week?
 * 
 * Check if the checkmark's date is within this week
 *
 * @param {Checkmark} checkmark
 * 
 * @returns {boolean} true/false
 */
export function isCheckmarkThisWeek(checkmark) {
  return isThisWeek(new Date(checkmark.date));
}

/**
 * Is checkmark last week?
 * 
 * Check if the checkmark's date is within lat week
 *
 * @param {Checkmark} checkmark
 * 
 * @returns {boolean} true/false
 */
export function isCheckmarkLastWeek(checkmark) {
  return getWeek(new Date(checkmark.date)) === getWeek(new Date()) - 1;
}

/**
 * Create pie chart data
 * 
 * Prepares the data that can be used by pie chart.
 *
 * @param {number} score an integer between 0 and 100.
 * 
 * @returns an array of data for pie chart
 */
export function createPieChartData(score) {
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

/**
 * Create ScoreType object
 *
 * @param {string} label score type description
 * @param {(checkmark: Checkmark) => boolean} filterFn function used to filter the checkmarks
 */
export function createScoreType(label, filterFn) {
  return { label, filterFn };
}

/**
 * Generates a list of objects with a label and pie chart data.
 *
 * @param {Checkmark[]} checkmarks
 * @param {ScoreType[]} scoreTypeList
 *
 */
export function getScoreTypeDataList(checkmarks, scoreTypeList) {
  // Map over each score type
  return scoreTypeList.map(({ label, filterFn }) => {
    const values = checkmarks
      // Filter the checkmarks
      .filter(filterFn)
      // Get only checkmark value
      .map((d) => d.value);

    // Calculate the score
    const score = calculateScore(values);

    // Return an object that can be in render
    return {
      label,
      data: createPieChartData(score),
    };
  });
}
