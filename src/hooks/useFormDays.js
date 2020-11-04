import { useState } from 'react';

export const useFormDays = (initialDays) => {
  const [days, setDays] = useState(initialDays);

  const toggleDay = id => {
    setDays(
      days.map(day => {
        if (day.id === id) {
          return { ...day, checked: !day.checked };
        } else {
          return day;
        }
      })
    );
  };

  const toggleAllDays = () => {
    setDays(
      days.map(day => ({
        ...day,
        checked: !day.checked,
      }))
    );
  };

  const resetDays = () => setDays(initialDays);

  const validateDays = () => days.some(d => d.checked);

  return { days, toggleDay, toggleAllDays, validateDays, resetDays };
};
