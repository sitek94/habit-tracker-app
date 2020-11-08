import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(weekday);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekStart: 1,
});

export default dayjs;