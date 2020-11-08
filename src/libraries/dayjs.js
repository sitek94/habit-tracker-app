import dayjs from 'dayjs';

import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.extend(isSameOrBefore);

dayjs.updateLocale('en', {
  weekStart: 1,
});

export default dayjs;