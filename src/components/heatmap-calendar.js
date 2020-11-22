import { ResponsiveCalendar } from '@nivo/calendar';

function HeatmapCalendar({ data }) {
  return (
    <ResponsiveCalendar
      data={data}
      from="2020-01-01"
      to="2020-03-12"
      emptyColor="#eeeeee"
      colors={['#f47560', '#e8c1a0', '#97e3d5', '#61cdbb']}
      minValue={0}
      maxValue={1}
      margin={{ top: 20, right: 16, bottom: 0, left: 25 }}
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
  );
}

export { HeatmapCalendar };
