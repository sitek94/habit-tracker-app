import { ResponsiveCalendar } from '@nivo/calendar';

import dayjs from 'services/dayjs';
import dataset from './heatmap-calendar/data';

function HeatmapCalendar({ data }) {

  return (
    <div style={{ height: 200 }}>
      <ResponsiveCalendar
        data={data}
        from="2020-01-01"
        to="2020-03-12"
        emptyColor="#eeeeee"
        colors={["#f47560", "#e8c1a0", "#97e3d5", "#61cdbb"]}
        minValue={0}
        maxValue={100}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </div>
  );
}

export default HeatmapCalendar;
