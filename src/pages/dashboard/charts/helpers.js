import { COMPLETED, FAILED } from 'data/constants';

/**
 * Prepare data to be used in heatmap
 * 
 * @param {Object} obj object of checkmarks
 */
export function heatmapDataFrom(obj) {
  return (
    Object.entries(obj)
      // For each entry in object prepare the data for heatmap.
      .map(([date, habitsObj]) =>
        createHeatmapData(date, getAvgValue(habitsObj))
      )
  );
}

function createHeatmapData(day, value) {
  return { day, value };
}

function getAvgValue(habitsObj) {
  let values = Object.values(habitsObj);

  let avg = values.reduce((sum, value) => sum + value, 0) / values.length;

  return Math.floor(avg * 100) / 100;
}

/**
 * Prepare data to be used in bar chart
 * 
 * @param {Object} obj 
 * @param {Array} datesRange 
 */
export function barChartDataFrom(obj, datesRange) {
  return datesRange.map(date => {
    let values = obj[date] ? Object.values(obj[date]) : null;
    
    return {
      date,
      completed: values ? countValues(values, COMPLETED) : null,
      failed: values ? -countValues(values, FAILED) : null,
    };
  });
}

function countValues(arr, value) {
  return arr.reduce((acc, cur) => (cur === value ? acc + 1 : acc), 0);
}
