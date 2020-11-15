import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function BarChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: "country",
        //   legendPosition: "middle",
        //   legendOffset: 32
        // }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}

export default BarChart;