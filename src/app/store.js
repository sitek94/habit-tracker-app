import { configureStore } from '@reduxjs/toolkit';

import habitsReducer from 'features/habits/habitsSlice';


export default configureStore({
  reducer: {
    habits: habitsReducer,
  },
});
