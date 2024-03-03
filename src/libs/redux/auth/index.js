import {createAction, createSlice} from '@reduxjs/toolkit';

export const setAppInitialized = createAction('app/setInitialized');

const initialState = {
  appInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setAppInitialized, state => {
      state.appInitialized = true;
    });
  },
});

export default authSlice.reducer;
