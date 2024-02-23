import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import pokemon from '../../axios';
import {PATH} from '../../../services/api/path';

export const fetchPokemon = createAsyncThunk(
  'posts/fetchPokemon',
  async ({limit, offset}) => {
    try {
      const response = await pokemon.get(
        `${PATH.POKEMON}/?limit=${limit}&offset=${offset}`,
      );
      const pokemonList = response.data.results;

      const detailPromises = pokemonList.map(async pokemonItem => {
        const detailResponse = await pokemon.get(
          `${PATH.POKEMON}/${pokemonItem.name}`,
        );
        return {
          id: detailResponse.data.id,
          name: detailResponse.data.name,
          image: detailResponse.data.sprites.other.dream_world.front_default,
        };
      });

      const pokemonWithDetails = await Promise.all(detailPromises);
      return pokemonWithDetails;
    } catch (error) {
      throw error;
    }
  },
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload];
      })
      .addCase(fetchPokemon.rejected, state => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
export const selectAllPokemon = state => state.pokemon.data;
export const selectStatus = state => state.pokemon.status;
export const selectError = state => state.pokemon.error;