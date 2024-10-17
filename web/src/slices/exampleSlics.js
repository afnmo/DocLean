// src/redux/slices/exampleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    // Define your initial state here
  },
  reducers: {
    // Add your reducer functions here
  },
});

export const { actions } = exampleSlice;
export default exampleSlice.reducer;