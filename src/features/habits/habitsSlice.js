import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'libraries/axios';

const initialState = {
  habits: [],
  status: 'idle',
  error: null,
};

// Fetch all habits
export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  const { data } = await axios.get('/habits.json');
  
  // User doesn't have any habits yet
  if (!data) return [];

  // Habits are send as an object so we need to convert that to an array
  const habits = Object.entries(data).map(([habitId, habitBody]) => ({
    id: habitId,
    ...habitBody
  }));
  
  return habits;
});

export const addNewHabit = createAsyncThunk(
  'habits/addNewHabit',
  // The payload creator receives the partial `{title, content, user}` object
  async initialHabit => {
    // // Send the initial habit object to the database
    const response = await axios.post('/habits.json', initialHabit);

    // The response includes newly create habit ID
    const habit = {
      ...initialHabit,
      id: response.data.name,
    }

    return habit;
  }
);

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    habitAdded: {
      reducer(state, action) {
        state.habits.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { habitId, reaction } = action.payload;
      const existingHabit = state.habits.find(habit => habit.id === habitId);
      if (existingHabit) {
        existingHabit.reactions[reaction]++;
      }
    },
    habitUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingHabit = state.habits.find(habit => habit.id === id);
      if (existingHabit) {
        existingHabit.title = title;
        existingHabit.content = content;
      }
    },
  },


  extraReducers: {
    // Fetch all habits
    [fetchHabits.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchHabits.fulfilled]: (state, action) => {
      state.status = 'succeeded';

      // Add any fetched habits to the array
      state.habits = state.habits.concat(action.payload);
    },
    [fetchHabits.rejected]: (state, action) => {
      state.status = 'failed';

      state.error = action.error.message;
    },

    // Add new habit
    [addNewHabit.fulfilled]: (state, action) => {
      // We can directly add the new post object to our habits array
      state.habits.push(action.payload)
    }

  },
});

export const { habitAdded, habitUpdated, reactionAdded } = habitsSlice.actions;

export default habitsSlice.reducer;

export const selectAllHabits = state => state.habits.habits;

export const selectHabitById = (state, habitId) =>
  state.habits.habits.find(habit => habit.id === habitId);
