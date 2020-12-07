import { getWeek, isThisWeek, isToday } from 'date-fns';

/**
 * Checkmark object
 * 
 * @typedef  Checkmark
 * 
 * @property {string} id
 * @property {string} date
 * @property {string} habitId
 * @property {number} value
 */

/**
 * Is checkmark today?
 * 
 * @returns {boolean} boolean
 */
export function isCheckmarkToday(checkmark) {
  return isToday(new Date(checkmark.date));
}

/**
 * Is checkmark this week?
 * 
 * @param {Checkmark} checkmark
 * @returns {boolean} boolean
 */
export function isCheckmarkThisWeek(checkmark) {
  return isThisWeek(new Date(checkmark.date));
}

/**
 * Is checkmark last week?
 * 
 * @returns {boolean} boolean
 */
export function isCheckmarkLastWeek(checkmark) {
  return getWeek(new Date(checkmark.date)) === getWeek(new Date()) - 1;
}

