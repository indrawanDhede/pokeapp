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

        const hpStat = detailResponse.data.stats.find(
          stat => stat.stat.name === 'hp',
        );

        const attackStat = detailResponse.data.stats.find(
          stat => stat.stat.name === 'attack',
        );

        const defenseStat = detailResponse.data.stats.find(
          stat => stat.stat.name === 'defense',
        );

        const spAttackStat = detailResponse.data.stats.find(
          stat => stat.stat.name === 'special-attack',
        );

        const spdefenseStat = detailResponse.data.stats.find(
          stat => stat.stat.name === 'special-defense',
        );

        const speedStat = detailResponse.data.stats.find(
          stat => stat.stat.name === 'speed',
        );

        return {
          id: detailResponse.data.id,
          name: detailResponse.data.name,
          image: detailResponse.data.sprites.front_default,
          type: detailResponse.data.types[0].type.name,
          information: {
            height: detailResponse.data.height,
            weight: detailResponse.data.weight,
            types: detailResponse.data.types[0].type.name,
          },
          stats: {
            hp: hpStat.base_stat,
            attack: attackStat.base_stat,
            defense: defenseStat.base_stat,
            specialAttack: spAttackStat.base_stat,
            specialDefense: spdefenseStat.base_stat,
            speed: speedStat.base_stat,
          },
          abilities: detailResponse.data.abilities,
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
    filteredData: {},
    totalData: 0,
    error: null,
  },
  reducers: {
    filterPokemonByName: (state, action) => {
      const {name} = action.payload;
      state.filteredData = state.data.find(pokemon =>
        pokemon.name.toLowerCase().includes(name.toLowerCase()),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload];
        state.totalData =
          action.payload.length > 0
            ? state.totalData + action.payload.length
            : state.totalData;
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

export const {filterPokemonByName} = pokemonSlice.actions;