import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import pokemon from '../../axios';

export const fetchPokemon = createAsyncThunk(
  'posts/fetchPokemon',
  async ({limit, offset}) => {
    try {
      const response = await pokemon.get(
        `/pokemon/?limit=${limit}&offset=${offset}`,
      );

      return response.data.results;
    } catch (error) {
      throw error;
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {data: [], status: 'idle'},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload];
      })
      .addCase(fetchPokemon.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default postSlice.reducer;
