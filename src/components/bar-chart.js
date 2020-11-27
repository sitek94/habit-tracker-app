import { ResponsiveBar } from '@nivo/bar';

export function BarChart({ data, keys, indexBy, maxValue }) {
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
      margin={{ top: 16, right: 16, bottom: 32, left: 16 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      colors={['#61cdbb', '#f47560']}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisLeft={false}
      axisBottom={{
        // format: xValueFormat,
        tickSize: 0,
        tickPadding: 12,
      }}
      markers={[
        {
          axis: 'y',
          value: 0,
          lineStyle: { stroke: '#f47560', strokeWidth: 1 },
          textStyle: { fill: '#e25c3b' },
        },
      ]}
      enableGridX={true}
      enableGridY={false}
      // labelFormat={yValueFormat}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    />
  );
}
