import React from 'react';
import { ResponsiveLine } from '@nivo/line';
const curveOptions = ['linear', 'monotoneX', 'step', 'stepBefore', 'stepAfter']
export function LineChart({ data, height }) {
  return (
    <div style={{ height }}>
      <ResponsiveLine
        data={data}
        curve="basis"
        
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        colors={['rgb(97, 205, 187)', 'rgb(244, 117, 96)']}
        xScale={{
          type: 'linear',
          min: 321
          // format: '%Y-%m-%d',
          // useUTC: false,
          // precision: 'day',
        }}
        // xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          min: -1,
          max: 1,
          stacked: false,
        }}
        axisBottom={{
          // format: '%b %d',
          // tickValues: 'every 1 days',
          // legend: 'time scale',
          // legendOffset: -12,
        }}
        axisLeft={{
          format: ">-.0%",
          tickValues: [-1, -.75, -.5, -.25, 0, .25, .5, .75, 1],
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        useMesh={true}
        crosshairType="cross"
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
