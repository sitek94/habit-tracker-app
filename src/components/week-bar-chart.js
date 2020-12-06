import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@material-ui/core';
import { countBy } from 'lodash';
import { format } from 'date-fns';
import { COMPLETED, FAILED } from 'data/constants';

function WeekBarChart({ checkmarks, dates, habitsCount }) {

  // Style
  const { palette } = useTheme();
  const { primary, secondary, getContrastText, text } = palette;

  // Data
  const data = dates.map((date) => {  
    // Values for the current date
    const values = checkmarks
      .filter(checkmark => checkmark.date === date)
      .map(checkmark => checkmark.value);
      
    // Count completed and failed values
    const counts = countBy(values);
      
    // Return object in the shape accepted by bar chart
    return {
        date,
        completed: counts[COMPLETED] || null,
        failed: -counts[FAILED] || null,
      }
  });

  // Label formats
  const xValueFormat = date => format(new Date(date), 'd-MMM');
  const yValueFormat = value => Math.floor((value / habitsCount) * 100) + '%';

  return (
    <ResponsiveBar
      data={data}
      keys={['completed', 'failed']}
      indexBy="date"
      margin={{ top: 16, right: 16, bottom: 32, left: 16 }}
      colors={[primary.main, secondary.main]}
      theme={{
        textColor: text.secondary
      }}
      valueScale={{ type: 'linear' }}
      axisLeft={false}
      axisBottom={{
        format: xValueFormat,
        tickSize: 0,
        tickPadding: 12,
      }}

      // Horizontal line between positive and negative bars
      markers={[
        {
          axis: 'y',
          value: 0,
          lineStyle: { stroke: secondary.main, strokeWidth: 1 },
        },
      ]}
      enableGridX={false}
      enableGridY={false}
      labelFormat={yValueFormat}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={getContrastText(primary.main)}

      // Animation disabled in development
      animate={false}

      // Interactivity - for the moment disabled. In the future might add some details.
      isInteractive={false}
    />
  );
}

export { WeekBarChart };
