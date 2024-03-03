import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAction = createAsyncThunk('user/login', async () => {
  try {
    const response = await axios.post('https://be2.ut.ac.id/usmanbe/login', {
      email: 'prasiwi@ecampus.ut.ac.id',
      password: 'Si2023!!ppp',
    });

    return response.data.data.user;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
  },
  reducers: {
    logoutAction: (state, action) => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAction.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export default userSlice.reducer;
export const {logoutAction} = userSlice.actions;
