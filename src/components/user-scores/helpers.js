import { useCheckmarks } from 'hooks/useCheckmarks';
import * as React from 'react';
import { ResponsivePie, Pie } from '@nivo/pie';
import {
  isWithinInterval,
  startOfWeek,
  lastDayOfWeek,
  subDays,
  startOfDay,
  getWeek,
  isThisWeek,
  isToday,
} from 'date-fns';
import { COMPLETED } from 'data/constants';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

/**
 * @typedef  Checkmark
 * @property {string} id
 * @property {string} date
 * @property {string} habitId
 * @property {number} value
 */

/**
 * Calculates the score for an array of checkmark values.
 * The perfomance is the count of COMPLETED checkmarks divided
 * by the total count.
 *
 * @param  {number[]} values
 * @return {number}   floored score between 0 and 100
 */
export function calculateScore(values) {
  if (!values.length) return 0;

  const completedCount = values.reduce((sum, value) => {
    return value === COMPLETED ? sum + 1 : sum;
  }, 0);

  return Math.floor((completedCount / values.length) * 100);
}

/**
 * Check if the checkmark's date is today
 *
 * @param {Checkmark} checkmark
 */
export function isCheckmarkToday(checkmark) {
  return isToday(new Date(checkmark.date));
}

/**
 * Check if the checkmark's date is within this week
 *
 * @param {Checkmark} checkmark
 */
export function isCheckmarkThisWeek(checkmark) {
  return isThisWeek(new Date(checkmark.date));
}

/**
 * Check if the checkmark's date is within lat week
 *
 * @param {Checkmark} checkmark
 */
export function isCheckmarkLastWeek(checkmark) {
  return getWeek(new Date(checkmark.date)) === getWeek(new Date()) - 1;
}

/**
 * Prepares the data that can be used by pie chart.
 *
 * @param {number} score an integer between 0 and 100.
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
