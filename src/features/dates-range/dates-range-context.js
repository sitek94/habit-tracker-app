import { createContext, useContext, useReducer } from 'react';

import dayjs from 'libraries/dayjs';

// Contexts
const DatesRangeStateContext = createContext();
const DatesRangeDispatchContext = createContext();

// Initial state
const initialState = {
  startDate: dayjs().weekday(0),
  endDate: dayjs().weekday(6),
  rangeLength: 7,
};

// Reducer
function datesRangeReducer(state, action) {
  switch (action.type) {
    case 'next': {
      const n = state.rangeLength;

      return {
        ...state,
        startDate: state.startDate.add(n, 'day'),
        endDate: state.endDate.add(n, 'day'),
      };
    }

    case 'previous': {
      const n = state.rangeLength;

      return {
        ...state,
        startDate: state.startDate.subtract(n, 'day'),
        endDate: state.endDate.subtract(n, 'day'),
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function createDatesRange(start, end) {
  let range = [];
  for (let d = start; d.isSameOrBefore(end); d = d.add(1, 'day')) {
    range.push(d);
  }
  return range;
}

// Provider
function DatesRangeProvider({ children }) {
  const [state, dispatch] = useReducer(datesRangeReducer, initialState);

  const { startDate, endDate } = state;
  const datesRange = createDatesRange(startDate, endDate);

  return (
    <DatesRangeStateContext.Provider value={{ ...state, datesRange }}>
      <DatesRangeDispatchContext.Provider value={dispatch}>
        {children}
      </DatesRangeDispatchContext.Provider>
    </DatesRangeStateContext.Provider>
  );
}

// State
function useDatesRangeState() {
  const context = useContext(DatesRangeStateContext);

  if (context === undefined) {
    throw new Error(
      'useDatesRangeState must be used within a DatesRangeProvider'
    );
  }

  return context;
}

// Dispatch
function useDatesRangeDispatch() {
  const context = useContext(DatesRangeDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useDatesRangeDispatch must be used within a DatesRangeProvider'
    );
  }

  return context;
}

export { DatesRangeProvider, useDatesRangeState, useDatesRangeDispatch };
