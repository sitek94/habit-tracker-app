import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function LineChart({ data, height }) {
  return (
    <div style={{ height }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 3,
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        lineWidth={4}
        enableArea={true}
        areaOpacity={0.5}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
      />
    </div>
  );
}

export default LineChart;
// <ResponsiveLine
//   data={data}
//   margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//   xScale={{ type: "point" }}
//   yScale={{
//     type: "linear",
//     min: "auto",
//     max: "auto",
//     stacked: true,
//     reverse: false
//   }}
//   yFormat=" >-.2f"
//   axisBottom={{
//     orient: "bottom",
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 0,

//     legendOffset: 36
//   }}
//   axisLeft={{
//     orient: "left",
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 0,
//     legend: "count",
//     legendOffset: -40,
//     legendPosition: "middle"
//   }}
//   enablePoints={false}
// />
